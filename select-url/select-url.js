/**
 * Select url feature.
 */
class SelectUrl extends gi.features.Feature {

  init() {
    this.addEventListener(this.node, 'change', () => {
      this.node.classList.add(this.options.loadingClass)
      window.location.href = this.node.value
    })
  }

}

SelectUrl.defaultOptions = {
  loadingClass: '-loading'
}

export default SelectUrl
