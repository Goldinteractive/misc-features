import ScrollMonitor from 'scrollmonitor'
import FeatureSlider from 'gi-feature-slider'

/**
 * Indication slider feature class.
 *
 * Extends slider feature to scroll from an percent offset
 * to the start to show the user that the content is scrollable.
 */
class IndicationSlider extends FeatureSlider {

  init() {
    super.init()

    if (!this.options.scrollOffset) {
      return
    }

    this.$slide = this.node.closest('[data-slide]')

    window.setTimeout(() => {
      // scroll to offset
      this.scrollToOffset()
      // initialize watcher
      this.watcher = ScrollMonitor.create(this.node)
      this.watcher.on('fullyEnterViewport', this._fullyEnterViewportListener())
    }, 0)
  }

  destroy() {
    if (this.watcher) {
      this.watcher.destroy()
    }

    super.destroy()
  }

  scrollToOffset() {
    this.flickity.x = this.flickity.slider.offsetWidth / 100 * (this.options.scrollOffsetPercent * -1)
    this.flickity.positionSlider()
  }

  scrollToStart() {
    this.flickity.select(0)
  }

  _fullyEnterViewportListener() {
    return this.fullEnterViewportListener = () => {
      this.scrollToStart()
      this.watcher.off('fullyEnterViewport', this.fullEnterViewportListener)
    }
  }

}

/**
 * Indication slider default options.
 *
 * @type {Object}
 * @property {Boolean} scrollOffset - Whether the scroll indication is enabled.
 * @property {Integer} scrollOffsetPercent - Percentage of the slider width used for the scroll offset.
 */
IndicationSlider.defaultOptions = Object.assign({}, FeatureSlider.defaultOptions, {
  scrollOffset: false,
  scrollOffsetPercent: 30
})

export default IndicationSlider
