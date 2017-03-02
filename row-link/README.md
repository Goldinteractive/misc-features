## Row link

Make whole row (tr) clickable.

### Markup example

```html
<tr>
    <td><a href="yoursite" data-feature="row-link">Link executed when clicked on row</a></td>
    <td>Some text</td>
    <td><a href="http://google.ch" target="_blank">Other link which doesnt trigger row click</a></td>
</tr>
```

### Available options with defaults

```js
gi.features.add('row-link', RowLink, {
  // no options available
})
```
