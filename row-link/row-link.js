/**
 * Select search feature class.
 */
class RowLink extends gi.features.Feature {

  init() {
    this.$closestRow = gi.utils.parent(this.node, (parent) => {
      return $parent.tagName.toLowerCase === 'tr'
    })

    this.addEventListener(this.$closestRow, 'click', this._clickListener())
  }

  _clickListener() {
    return (e) => {
      if (e.target.nodeName.toLowerCase() !== 'a') {
        e.preventDefault()
        this.node.click()
      }
    }
  }

}

export default RowLink
