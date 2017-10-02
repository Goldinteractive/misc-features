## AutoPlayView Media

Auto play media (video/sound) when in viewport. Currently just supporting youtube and vimeo videos.

### Dependencies

* [scrollmonitor](https://github.com/stutrek/scrollMonitor)

### Markup example

Youtube Video (API will be loaded automatically):

```html
<iframe data-feature="autoplayview-media" data-type="youtube" scrolling="no" frameborder="0" width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1"  allowfullscreen></iframe>
```

Vimeo Video:

```html
<iframe data-feature="autoplayview-media" data-type="vimeo" scrolling="no" frameborder="0" width="560" height="315" src="https://player.vimeo.com/video/78329678" allowfullscreen></iframe>

<!-- Vimeo API -->
<script src="https://player.vimeo.com/api/player.js"></script>
```