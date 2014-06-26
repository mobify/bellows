# Mobify Bellows

A mobile-first accordion UI module for progressive disclosure on the web.

## Docs

You can find docs and examples here: http://mobify.github.io/bellows.

## Usage


## Initializing the plugin

### bellows()

Initializes the bellows.

    $('.bellows').bellows();

### bellows(options)

Initialize with options.

    $('.bellows').bellows({
      {
        singleNodeOpen: false,
        duration: 200,
        easing: 'swing',
        open: function(e, ui) {},
        opened: function(e, ui) {},
        close: function(e, ui) {},
        closed: function(e, ui) {}
      }
    });

### Storing bellows object for future use

    var $bellows = $(".bellows");
    
## Methods


### Open

Open the selected bellows item by element reference

    $bellows.bellows('open', $(".bellows__item"));

or by index

    $bellows.bellows('open', 1);


### Close
    
Close the selected bellows item by element reference

    $bellows.bellows('close', $(".bellows__item"));

or by index

    $bellows.bellows('close', 1);
    

## Event hooks

### Open

Execute this function every time the selected bellows item is starting to open.

    $(".bellows").bellows({
        open: function() { console.log("Open"); }
    });


### Opened

Execute this function every time the selected bellows item has finished opening.

    $(".bellows").bellows({
        opened: function() { console.log("Opened"); }
    });

### Close

Execute this function every time an bellows item is starting to close.
    
    $(".bellows").bellows({
        close: function() { console.log("Close"); }
    });
    
    
### Closed

Execute this function every time an bellows item is finished closing.
    
    $(".bellows").bellows({
        closed: function() { console.log("Closed"); }
    });


## Browser Compatibility


| Browser           | Version | Support                    |
|-------------------|---------|----------------------------|
| Mobile Safari     | 4.0.x   | Degraded. No transitions.  |
| Mobile Safari     | 5.0+    | Supported.                  |
| Android Browser   | 4.0+    | Supported.                  |
| Android Browser   | 2.3.x   | Degraded. No transitions.  |
| Chrome (Android)  | 1.0+    | Supported.                  |


## Building a distribution

### Requirements
* [node.js 0.10.x/npm](http://nodejs.org/download/)
* [Zepto](http://zeptojs.com/)
* [Velocity.js](http://julian.com/research/velocity/)

### Steps
1. `npm install -g grunt-cli`
2. `npm install`
3. `grunt`

The dist directory will be populated with minified versions of the css and 
javascript files and a .zip of the original source files (for distribution and
use with whatever build system you might use).

