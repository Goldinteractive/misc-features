## Campaign subscription

Campaign subscription form with ajax.

### Markup example

```html
<form action="//mintarchitecture.createsend.com/t/d/s/phjcl/" method="post" data-feature="campaign-subscription">

    <label for="fieldoljmy">Company</label>
    <input id="fieldoljmy" name="cm-f-oljmy" type="text">

    <label for="fieldEmail">Email*</label>
    <input id="fieldEmail" name="cm-phjcl-phjcl" type="email" required>

    <div data-form-message></form>

</form>
```

### Available options with defaults

```js
gi.features.add('campaign-subscription', CampaignSubscription, {

  // error message if ajax request fails everything else fails and no 
  unknownErrorMessage: 'An unknown error occured sending newsletter form'

  // class while ajax request is pending
  loadingClass: '-loading',

  // selector for element where to write message in
  messageSelector: '[data-form-message]'

  // class for message element when subscription fails
  messageErrorClass: '-error',

  // class for message element when subscription succeeds
  messageSuccessClass: '-success'

})
```
