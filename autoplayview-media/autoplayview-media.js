import ScrollMonitor from 'scrollmonitor'

const API_YOUTUBE = 'https://www.youtube.com/iframe_api'

const TYPE_YOUTUBE = 'youtube'
const TYPE_VIMEO = 'vimeo'

const ACTION_PLAY = 'play'
const ACTION_PAUSE = 'pause'
const ACTION_STOP = 'stop'

/**
 * Auto play media when in viewport.
 *
 * @extends {module:base/features~Feature}
 */
class AutoPlayViewMedia extends gi.features.Feature {

  init() {
    var mediaType = this.node.getAttribute('data-type')

    switch (mediaType) {
      case TYPE_YOUTUBE:
        this.controller = new YoutubeController(this.node)
        break
      case TYPE_VIMEO:
        this.controller = new VimeoController(this.node)
        break
      default:
        throw new Error(`Media type "${mediaType}" not defined`)
    }

    this.watcher = ScrollMonitor.create(this.node)
    this.watcher.on('fullyEnterViewport', this._fullyEnterViewportListener())
    this.watcher.on('exitViewport', this._exitViewportListener())
  }

  destroy() {
    super.destroy()
    this.controller.destroy()
  }

  _fullyEnterViewportListener() {
    return () => {
      if (!this.controller.ended) {
        this.controller.play()
      }
    }
  }

  _exitViewportListener() {
    return () => {
      if (!this.controller.ended) {
        this.controller.pause()
      }
    }
  }

}


class Controller {

  constructor($element) {
    this.ended = false
    this.$element = $element
    this.loaded = false
    this.actions = []
    this.init()
  }

  init() {}
  destroy() {}
  playMedia() {}
  pauseMedia() {}
  stopMedia() {}

  play() {
    this.actions.push(ACTION_PLAY)
    this.playMedia()
  }

  pause() {
    this.actions.push(ACTION_PAUSE)
    this.pauseMedia()
  }

  stop() {
    this.actions.push(ACTION_STOP)
    this.stopMedia()
  }

}


class VimeoController extends Controller {

  init() {
    this._loadPlayer()
  }

  playMedia() {
    if (this.loaded) {
      this.player.play()
    }
  }

  pauseMedia() {
    if (this.loaded) {
      this.player.pause()
    }
  }

  stopMedia() {
    if (this.loaded) {
      this.player.stop()
    }
  }

  _loadPlayer() {
    this.player = new Vimeo.Player(this.$element)
    this.loaded = true
  }

}


class YoutubeController extends Controller {

  init() {
    if (gi.utils.media.youtubeApiLoaded) {
      this._loadPlayer()
    } else {
      this.apiReadyListener = this._onApiReady()
      // listen to global youtube api event hub load event
      gi.eventHub.on('apiReady:youtube', this.apiReadyListener)
      // load youtube api library
      gi.utils.fetch.script(API_YOUTUBE)
    }
  }

  destroy() {
    gi.eventHub.off('apiReady:youtube', this.apiReadyListener)
  }

  playMedia() {
    if (this.loaded) {
      this.player.playVideo()
    }
  }

  pauseMedia() {
    if (this.loaded) {
      this.player.pauseVideo()
    }
  }

  stopMedia() {
    if (this.loaded) {
      this.player.stopVideo()
    }
  }

  _loadPlayer() {
    this.player = new YT.Player(this.$element, {
      events: {
        onStateChange: (e) => {
          if (e.data == YT.PlayerState.ENDED) {
            this.ended = true
          } else {
            this.ended = false
          }
        },
        onReady: () => {
          this.loaded = true

          if (this.actions[this.actions.length - 1] == ACTION_PLAY) {
            this.play()
          }
        }
      }
    })
  }

  _onApiReady() {
    return () => {
      this._loadPlayer()
    }
  }

}

export default AutoPlayViewMedia
