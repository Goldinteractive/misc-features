const CAMPAIGN_JSONP_PROP_STATUS = 'Status'
const CAMPAIGN_JSONP_PROP_MESSAGE = 'Message'
const CAMPAIGN_JSONP_PROP_REDIRECT_URL = 'RedirectUrl'

/**
 * Campaign subscription form feature.
 */
class CampaignSubscription extends gi.features.Feature {

  init() {
    if (this.node.tagName.toLowerCase() != 'form') {
      console.error('Feature "'+ this.name +'" must be initialized with a <form> element!')
      return
    }

    this.$message = this.$(this.options.messageSelector)
    this.addEventListener(this.node, 'submit', this._submitListener())
  }

  _submitListener() {
    return (e) => {
      e.preventDefault()
      var $form = e.currentTarget
      var formData = {}

      this.node.classList.add(this.options.loadingClass)

      new FormData($form).forEach((value, key) => {
        formData[key] = value
      })

      var url = $form.action +'?'+ gi.utils.object.serialize(formData)

      gi.utils.fetch.jsonP(url, {
        method: 'GET'
      }).then(this.feedback.bind(this))
    }
  }

  feedback(data) {
    var status = data[CAMPAIGN_JSONP_PROP_STATUS] || 400
    var message = data[CAMPAIGN_JSONP_PROP_MESSAGE] || ''
    var redirectUrl = data[CAMPAIGN_JSONP_PROP_REDIRECT_URL] || null

    this.node.classList.remove(this.options.loadingClass)
    this.node.classList.remove(this.options.messageErrorClass)
    this.node.classList.remove(this.options.messageSuccessClass)

    if (status != 200) {
      this.$message.classList.add(this.options.messageErrorClass)
      this.$message.textContent = message || this.options.unknownErrorMessage
      return
    }

    this.$message.classList.add(this.options.messageSuccessClass)
    this.$message.textContent = message

    if (redirectUrl) {
      console.info('Redirect to URL given by campaign: '+ redirectUrl)
      window.location.href = redirectUrl
    }
  }

  destroy() {
    super.destroy()
  }

}

CampaignSubscription.defaultOptions = {
  unknownErrorMessage: 'An unknown error occured sending newsletter form',
  loadingClass: '-loading',
  messageSelector: '[data-form-message]',
  messageErrorClass: '-error',
  messageSuccessClass: '-success'
}

export default CampaignSubscription
