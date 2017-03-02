## Confirm click

Display a native confirm dialog before performing a click.

### Markup example

```html
<a href="http://google.ch" data-feature="confirm-click" data-confirm-message="Do you really really want to do that?">Test</a>
```

### Available options with defaults

```js
gi.features.add('confirm-click', ConfirmClick, {

  // default confirm message (can be overwritten by data-confirm-message attribute)
  confirmMessage: 'Do you really want to do that?'

})
```
