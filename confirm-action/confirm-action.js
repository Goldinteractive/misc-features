/**
 * Confirm action feature class.
 */
class ConfirmAction extends gi.features.Feature {

  init() {
    this.addEventListener(this.node, 'click', this._clickListener())
  }

  _clickListener() {
    return (e) => {
      // var confirmText = gi.utils.data.get(this.node, 'confirm-message') || this.options.confirmMessage
      var confirmText = this.node.getAttribute('data-confirm-message') || this.options.confirmMessage
      if (!window.confirm(confirmText)) e.preventDefault()
    }
  }

}

ConfirmAction.defaultOptions = {
  confirmMessage: 'Do you really want to do that?'
}

export default ConfirmAction
