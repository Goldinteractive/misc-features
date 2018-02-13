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
      var formData = {}

      this.node.classList.add(this.options.loadingClass)

      for (let i = 0; i < this.node.elements.length; i++) {
        var tag = this.node.elements[i].getAttribute('name')

        if (tag) {
          tag = tag.toLowerCase()

          switch (tag) {
            case 'checkbox':
            case 'radio':
              if (this.node.elements[i].checked) {
                formData[tag] = this.node.elements[i].value
              }
              break
            default:
            case 'input':
            case 'select':
            case 'textarea':
              formData[tag] = this.node.elements[i].value
          }
        }
      }

      gi.utils.fetch.jsonP(this.node.action, {
        method: 'GET',
        queryParams: formData
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

      if (this.options.ownErrorMessage) {
        this.$message.textContent = this.options.ownErrorMessage
      } else {
        this.$message.textContent = message || this.options.unknownErrorMessage
      }

      return
    }

    this.$message.classList.add(this.options.messageSuccessClass)

    if (this.options.ownSuccessMessage) {
      this.$message.textContent = this.options.ownSuccessMessage
    } else {
      this.$message.textContent = message
    }

    if (this.options.resetFormOnSuccess) {
      this.node.reset()
    }

    if (redirectUrl) {
      console.info('Redirect to URL given by campaign: '+ redirectUrl)
      window.location.href = redirectUrl
    }
  }

}

CampaignSubscription.defaultOptions = {
  resetFormOnSuccess: true,
  ownSuccessMessage: null,
  // ownSuccessMessage: 'Vielen Dank für Ihre Anmeldung.',
  ownErrorMessage: null,
  // ownErrorMessage: 'Bitte füllen Sie alle Felder korrekt aus.',
  unknownErrorMessage: 'An unknown error occured sending newsletter form',
  loadingClass: '-loading',
  messageSelector: '[data-form-message]',
  messageErrorClass: '-error',
  messageSuccessClass: '-success'
}

export default CampaignSubscription
