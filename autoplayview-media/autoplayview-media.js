import ScrollMonitor from 'scrollmonitor'

const TYPE_YOUTUBE = 'youtube'

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
      default:
        this.controller = new Controller(this.node)
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


const ACTION_PLAY = 'play'
const ACTION_PAUSE = 'pause'
const ACTION_STOP = 'stop'

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

class YoutubeController extends Controller {

  init() {
    this.apiReadyListener = this._onApiReady()
    // listen to global youtube api event hub load event
    gi.eventHub.on('apiReady:youtube', this.apiReadyListener)
    // load youtube api library
    gi.utils.fetch.script('https://www.youtube.com/iframe_api')
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

  _onApiReady() {
    return () => {
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
  }

}

export default AutoPlayViewMedia
