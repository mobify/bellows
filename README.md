# Mobify Bellows

A mobile-first accordion UI module for progressive disclosure on the web.

## Docs

You can find docs and examples here: http://mobify.github.io/bellows.

## Usage

```html
<!-- Include the CSS (if you're not using Sass) -->
<link rel="stylesheet" href="bellows.min.css">

<!-- Optionally include the Theme file -->
<link rel="stylesheet" href="bellows-style.min.css">

<!-- Include the markup -->
<div class="bellows">
    <!-- The Accordion Items -->
    <div class="bellows__item">
        <div class="bellows__header">
            <!-- Item Header -->
            <h3>Header</h3>
        </div>
        <div class="bellows__content">
            <!-- Item Content -->
            <p>Content</p>
        </div>
    </div>
    <div class="bellows__item">
        <div class="bellows__header">
            <h3>Header</h3>
        </div>
        <div class="bellows__content">
            <p>Content</p>
        </div>
    </div>
    <div class="bellows__item">
        <div class="bellows__header">
            <h3>Header</h3>
        </div>
        <div class="bellows__content">
            <p>Content</p>
        </div>
    </div>
</div>

<!-- include Zepto.js -->
<script src="zepto.min.js"></script>

<!-- include bellows.js -->
<script src="bellows.min.js"></script>

<!-- construct the bellows -->
<script>$('.bellows').bellows()</script>
```

## Initializing the plugin

### bellows()

Initializes the bellows.

```js
$('.bellows').bellows();
```

### bellows(options)

Initialize with options.

```js
$('.bellows').bellows({
    singleItemOpen: false,
    duration: 200,
    easing: 'swing',
    open: function(e, ui) {},
    opened: function(e, ui) {},
    close: function(e, ui) {},
    closed: function(e, ui) {}
});
```

### Storing bellows object for future use

```js
var $bellows = $(".bellows");
```

### Getting the bellows instance

```js
var bellows = $('.bellows).data('bellows');
bellows.open(1);
```

You can then call methods just like a regular object. The preferred way to invoke methods on the instance is via the plugin API, as shown below.

## Methods

### Open

Open the selected bellows item by element reference

```js
$bellows.bellows('open', $('.bellows__item'));
```

or by index

```js
$bellows.bellows('open', 1);
```

### Close
    
Close the selected bellows item by element reference

```js
$bellows.bellows('close', $('.bellows__item'));
```

or by index

```js
$bellows.bellows('close', 1);
```

## Options

### singleItemOpen

When set to 'true' will force only one item open at a time.

```js
$('.bellows').bellows({
    singleItemOpen: true
});
```

### duration

Sets the duration for the animation.

```js
$('.bellows').bellows({
    duration: 600
});
```

### easing

Sets the easing for the animation. Bellows takes all of the same easing properties that [Velocity.js](http://julian.com/research/velocity) accepts.

> * [jQuery UI's easings](http://easings.net/) and CSS3's easings ("ease", "ease-in", "ease-out", and "ease-in-out"), which are pre-packaged into Velocity. A bonus "spring" easing (sampled in the CSS Support pane) is also included. 
* CSS3's bezier curves: Pass in a four-item array of bezier points. (Refer to [Cubic-Bezier.com](http://cubic-bezier.com/) for crafing custom bezier curves.) 
* Spring physics: Pass a two-item array in the form of [ tension, friction ]. A higher tension (default: 600) increases total speed and bounciness. A lower friction (default: 20) increases ending vibration speed. 
* Step easing: Pass a one-item array in the form of [ steps ]. The animation will jump toward its end values using the specified number of steps. 

For more information, check out [Velocity's docs on easing](http://julian.com/research/velocity/#easing).

```js
$('.bellows').bellows({
    easing: 'ease-in-out'
});
```

### open

Execute this function every time the selected bellows item is starting to open.

```js
$('.bellows').bellows({
    open: function(e, ui) { 
		// ui.item contains the item opening
	}
});
```

### opened

Execute this function every time the selected bellows item has finished opening.

```js
$('.bellows').bellows({
    opened: function(e, ui) { 
        // ui.item contains the item that opened
    }
});
```

### close

Execute this function every time an bellows item is starting to close.

```js
$('.bellows').bellows({
    close: function(e, ui) { 
        // ui.item contains the item closing
    }
});
```

### closed

Execute this function every time an bellows item is finished closing.

```js
$('.bellows').bellows({
    closed: function(e, ui) { 
        // ui.item contains the item that closed
    }
});
```

## Browser Compatibility

| Browser           | Version | Support                    |
|-------------------|---------|----------------------------|
| Mobile Safari     | 4.0.x   | Degraded. No transitions.  |
| Mobile Safari     | 5.0+    | Supported.                 |
| Android Browser   | 4.0+    | Supported.                 |
| Android Browser   | 2.3.x   | Degraded. No transitions.  |
| Chrome (Android)  | 1.0+    | Supported.                 |


## Building a distribution

### Requirements
* [node.js 0.10.x/npm](http://nodejs.org/download/)
* [Zepto](http://zeptojs.com/)
* [Velocity.js](http://julian.com/research/velocity/)

### Steps
1. `npm install -g grunt-cli`
1. `npm install`
1. `bower install`
1. `grunt`

The `dist` directory will be populated with minified versions of the css and javascript files for distribution and use with whatever build system you might use. The `src` directory has our raw unminified Sass and Javascript files if you prefer to work with those.

## License

_MIT License. Bellows is Copyright © 2014 Mobify. It is free software and may be redistributed under the terms specified in the LICENSE file._