## Indication scroller

Extends [slider feature](https://github.com/Goldinteractive/feature-slider) to scroll from an percent offset to the start to show the user that the content is scrollable.

### Dependencies

* [scrollmonitor](https://github.com/stutrek/scrollMonitor)

### Available options with defaults

```js
gi.features.add('slider', IndicationSlider, {

  // whether the scroll indication is enabled.
  scrollOffset: false,

  // percentage of the slider width used for the scroll offset.
  scrollOffsetPercent: 30

  // default slider features options ...
})
```