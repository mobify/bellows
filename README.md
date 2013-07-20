# Mobify Accordion

A mobile-first accordion module for progressive disclosure on the web.

## Usage

    <!-- include accordion.css -->
    <link rel="stylesheet" href="accordion.css">

    <!-- the markup -->
    <ul class="m-accordion">
      <!-- the items -->
      <li class="m-item">
        <h3 class="m-header">
          <!-- header title -->
          <a>Tab1</a>
        </h3>
        <div class="m-content">
          <div class="m-inner-content">
            <!-- content for item -->
            <h2>Content 1</h2>
            <h2>Lorem Ipsum</h2>
          </div>
        </div>
      </li>
      <li class="m-item">
        <h3 class="m-header">
          <a>Tab2</a>
        </h3>
        <div class="m-content">
          <div class="m-inner-content">
            <h2>Content 2</h2>
            <p>Lorem Ipsum</p>
          </div>
        </div>
      </li>
      <li class="m-item">
        <h3 class="m-header">
          <a>Tab3</a>
        </h3>
        <div class="m-content">
          <div class="m-inner-content">
            <h2>Content 3</h2>
            <p>Lorem Ipsum</p>
          </div>
        </div>
      </li>
    </ul>

    <!-- include zepto.js or jquery.js -->
    <script src="zepto.js"></script>
    <!-- include accordion.js -->
    <script src="accordion.js"></script>
    <!-- construct the accordion -->
    <script>$('.m-accordion').accordion();
    </script>

## Methods

### accordion()

Initializes the accordion.

    $('.m-accordion').accordion();

### accordion(options)

Initialize with options.

    $('.m-accordion').accordion({
      {
        ...
        options (refer below)
        ...
      }
    });

### Storing accordion object for future use

    var $accordion = $(".m-accordion"); // A Zepto element array is returned
    var accordion = $accordion[0].accordion; // We access the appropriate accordion from the above array

### unbind()

Removes any tap, mouse, and other event handlers from the accordion.

    accordion.unbind();

### bind()

Restores the tap, mouse, and other event handlers for the accordion.

    accordion.bind();

### destroy()

Unbinds the events from the accordion, and removes it from the DOM.

    accordion.destroy(); // destroys the DOM element and the jQuery bindings
    accordion = null; // destroys the Mobify accordion object as well

### open($item)

Open the selected accordion item

    accordion.open($(".m-item").eq(2));

### close($item)
    
Close the selected accordion item

  accordion.close($("#some-item"));

### recalculateItemHeight($item)

Recalculate the heights of accordion item elements. This is used when the heights of the content have changed after creation of the accordion.

    accordion.recalculateItemHeight($(".m-item"));

## Class names

Set the class names for the different elements, if deviating from the defaults.
  
  $(".m-accordion").accordion({
    closedClass: 'm-closed',
    openedClass: 'm-opened',
    activeClass: 'm-active',
    contentClass: 'm-content',
    innerContentClass: 'm-inner-content',
    headerClass: 'm-header',
    itemClass: 'm-item'
  });

## Event hooks

### onTransitionDone: functionName

Execute this function every time the selected accordion item is opened or closed.

    $(".m-accordion").accordion({
        onTransitionDone: function() { console.log("Animation done"); }
    });

### onOpened: functionName

Execute this function every time the selected accordion item is opened.

    $(".m-accordion").accordion({
        onOpened: function() { console.log("Opened"); }
    });

### onClosed: functionName

Execute this function every time an accordion item is closed
    
    $(".m-accordion").accordion({
        onClosed: function() { console.log("Closed"); }
    });

## Browser Compatibility


| Browser           | Version | Support                    |
|-------------------|---------|----------------------------|
| Safari            | 4.0+    | Supported.                 |
| Firefox           | 3.5-3.6 | Degraded. No transitions.  |
| Firefox           | 4.0+    | Supported                  |
| Chrome            | 9.0+    | Supported                  |
| Opera             | 12.0+   | Supported.                 |
| Internet Explorer | 6-7.0   | Not Supported              |
| Internet Explorer | 8.0     | Degraded. No transitions.  |
| Internet Explorer | 9.0     | Degraded. No transitions.  |
| Internet Explorer | 10.0    | Supported                  |
| Mobile Safari     | 3.1.*   | Degraded. No transitions   |
| Mobile Safari     | 4.0+    | Supported                  |
| Android Browser   | 2.1+    | Supported                  |
| Chrome (Android)  | 1.0+    | Supported                  |
| Firefox (Android) | 1.0+    | Supported                  |
| Windows Phone     | 7.5     | Degraded. No transitions.  |

## Building
### Requirements
* [node.js 0.8.x/npm](http://nodejs.org/download/)

### Steps
1. `npm install -g grunt-cli`
2. `npm install`
3. `grunt`

The build directory will be populated with minified versions of the css and 
javascript files and a .zip of the original source files (for distribution and
use with whatever build system you might use).

