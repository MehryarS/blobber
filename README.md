# blobber
====
It is a light javascript library based on jQuery for helping you to make object URL for videos on each page.
The URL lifetime is tied to the document in the window on which it was created.

*blobber make blob URL (blob is a pseudo protocol - **b**inary **l**arge **ob**ject) for your videos.*




### INSTALLATION:

You can use npm to install blobber
```sh
npm install blobber
```


or you can do it manually:
1. Include CSS file to head tag
```html
<link rel="stylesheet" type="text/css" href="css/blobber.css">
```
2. Include the JS file before the end of your body tag, below the JQuery plugin
```html
<script type="text/javascript" src="js/blobber.js"></script>
```




### USAGE:
**Step 1:** Add videos to html document as DOM:
```html
<div id="video-container">
    <video id="video-1" muted controls src="videos/611180814.mp4"></video>
    <video id="video-2" muted controls src="videos/627974149.mp4"></video>
    <video id="video-3" muted controls src="videos/680705713.mp4"></video>
    <video id="video-4" muted controls src="videos/703407890.mp4"></video>
</div>
```

##### TIPS:
1. Each video should have an unique id.
2. You can use all video attributes.


**Step 2:** Fire the plugin
```javascript
$("#video-container").blobber();
```




### OPTIONS:
You can customize:
| Parameter            | Default Value | Description                              |
| -------------------- | ------------- | ---------------------------------------- |
| complete             | null          | Use founctions as a callback             |
| preloader            | true          | Disable preloader                        |
| preloaderBackground  | "#FFFFFF"     | Change preloader background color        |
| progressBar          | true          | Hide progress bar on preloader page      |
| progressBarColor     | "#000000"     | Change progress bar color                |
| progressSpinner      | true          | Hide spinner animation on preloader page |
| progressSpinnerColor | "#000000"     | Change spinner animation color           |
| progressStatus       | true          | Hide status reporter on preloader page   |
| progressStatusColor  | "#999999"     | Change status reporter color             |




### EXAMPLE:
```javascript
$("#video-container").blobber({
    complete: function(){
        alert("Hello, It's Done!");
    }
});
```




###LICENSE:
This software is free to use under the MIT license.