## Select url

Switch location when value of select has been changed.

### Markup example

```html
<select data-feature="select-url">
    <option value="http://google.ch">Switch to google</option>
</select>
```

### Available options with defaults

```js
gi.features.add('select-url', SelectUrl, {

  // class added when new url starts loading
  loadingClass: '-loading'

})
```
