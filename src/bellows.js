var Mobify = window.Mobify = window.Mobify || {}; 
Mobify.$ = Mobify.$ || window.Zepto || window.jQuery;
Mobify.UI = Mobify.UI || {};

(function($, document) {
    $.support = $.support || {};

    $.extend($.support, {
        'touch': 'ontouchend' in document
    });

})(Mobify.$, document);



/**
    @module Holds common functions relating to UI.
*/
Mobify.UI.Utils = (function($) {
    var exports = {}
        , has = $.support;
    /**
        Events (either touch or mouse)
    */
    exports.events = (has.touch)
        ? {down: 'touchstart', move: 'touchmove', up: 'touchend'}
        : {down: 'mousedown', move: 'mousemove', up: 'mouseup'};

    /**
        Returns the position of a mouse or touch event in (x, y)
        @function
        @param {Event} touch or mouse event
        @returns {Object} X and Y coordinates
    */
    exports.getCursorPosition = (has.touch)
        ? function(e) {e = e.originalEvent || e; return {x: e.touches[0].clientX, y: e.touches[0].clientY}}
        : function(e) {return {x: e.clientX, y: e.clientY}};


    /**
        Returns prefix property for current browser.
        @param {String} CSS Property Name
        @return {String} Detected CSS Property Name
    */
    exports.getProperty = function(name) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms', '']
          , testStyle = document.createElement('div').style;
        
        for (var i = 0; i < prefixes.length; ++i) {
            if (testStyle[prefixes[i] + name] !== undefined) {
                return prefixes[i] + name;
            }
        }

        // Not Supported
        return;
    };

    // determine which transition event to use
    function whichTransitionEvent(){
        // http://stackoverflow.com/questions/5023514/how-do-i-normalize-css3-transition-functions-across-browsers
        // hack for ios 3.1.* because of poor transition support.
        if (/iPhone\ OS\ 3_1/.test(navigator.userAgent)) {
            return undefined;
        }

        var el = document.createElement('fakeelement');
        var transitions = {
            'transition':'transitionEnd transitionend',
            'OTransition':'oTransitionEnd',
            'MSTransition':'msTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        }

        var t;
        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
        return;
    };

    $.extend(exports.events, {
        'transitionend': whichTransitionEvent()
    });

    return exports;

})(Mobify.$);


/*
 Supports accordions in an accordion
*/
Mobify.UI.Bellows = (function($, Utils) {
   
    var has = $.support;

    // Constructor
    var Bellows = function(element, options) {

        // Bellows settings
        this.settings = $.extend({
            dragRadius: 10
            , closedClass: 'm-closed'
            , openedClass: 'm-opened'
            , activeClass: 'm-active'
            , contentClass: 'm-content'
            , innerContentClass: 'm-inner-content'
            , headerClass: 'm-header'
            , itemClass: 'm-item'
            , onTransitionDone: null
            , onOpened: null
            , onClosed: null
        }, options || {});

        this.$element = $(element).attr( 'data-accordion-level', $(element).parents('.m-accordion').length + 1);
        
        $.extend(this, this.bind());
        return this;
    };

    Bellows.prototype.bind = function() {
        var $element = this.$element
            , xy
            , dxy
            , settings = this.settings
            , dragRadius = settings.dragRadius
            , openedClass = settings.openedClass
            , closedClass = settings.closedClass
            , activeClass = settings.activeClass
            , contentClass = settings.contentClass
            , headerClass = settings.headerClass
            , itemClass = settings.itemClass;

        function endTransition(){
            // transition attached to .content elements, use parent to grab .item
            var $item = $(this).parent();
            // if the transition is ending
            if ($item.hasClass(closedClass)) $(this).parent().removeClass(activeClass);
            // Execute any callbacks that were passed
            executeCallbacks($item.hasClass(closedClass) ? 'closing' : 'opening');
            recalculateHeight();
        };

        function recalculateHeight() {
            // recalculate proper height
            var height = 0;

            $element.children( '.' + itemClass).each(function(index) {
                var $item = $(this);
                height += $item.height();
            });
            $element.css('min-height', height + 'px');         
        }

        // Calculate height of individual accordion item (useful for dynamic item creation)
        function recalculateItemHeight($item, $loopOnce) {

            var $content = $item.children('.' + contentClass);
            // determine which height function to use (outerHeight not supported by zepto)
            var contentChildren = $content.children();
            setTimeout( function () {
                var contentHeight = ('outerHeight' in contentChildren) ? contentChildren['outerHeight']() : contentChildren['height']();
                $content.css('max-height', contentHeight * 1.5 +'px'); 
                // if transitions are supported, minimize browser reflow by adding the height
                // of the to-be expanded content element to the height of the entire accordion
                if (Utils.events.transitionend) {
                    $element.css('min-height', $element.height() + contentHeight + 'px');
                }
                recalculateHeight();

                if( $loopOnce == null && $item.closest('.m-accordion').attr('data-accordion-level') > 1 ) {
                    recalculateItemHeight( $item.parent().closest('li'), true )
                }
            }, 50 );
        }

        // Execute any callback functions that are passed to open/close
        function executeCallbacks(type) {
            if(type === 'opening' && typeof settings['onOpened'] === "function") { 
                settings['onOpened'].apply(this, arguments);
            } 
            if(type === 'closing' && typeof settings['onClosed'] === "function") { 
                settings['onClosed'].apply(this, arguments);
            } 
            if(typeof settings['onTransitionDone'] === "function") {
                settings['onTransitionDone'].apply(this, arguments);
            }
        }

        function close($item) {
            if( $element.attr('data-accordion-level') == $item.closest('.m-accordion').attr('data-accordion-level') ) {
                if($item.hasClass(closedClass)) { executeCallbacks('closing'); }
                // toggle opened and closed classes
                $item.removeClass(openedClass);
                $item.addClass(closedClass);
                // toggle active class on close only if there is no transition support
                if(!Utils.events.transitionend) $item.removeClass(activeClass);
                // set max-height to 0 upon close
                $item.children('.' + contentClass).css('max-height', '0px');
            }
        }
        
        function open($item) {
            if( $element.attr('data-accordion-level') == $item.closest('.m-accordion').attr('data-accordion-level') ) {
                if($item.hasClass(openedClass)) { executeCallbacks('opening'); }
                $item.addClass(activeClass);
                $item.removeClass(closedClass);
                $item.addClass(openedClass)
                recalculateItemHeight($item);
            }
        }

        function down(e) {
            // get initial position on mouse/touch start
            xy = Utils.getCursorPosition(e);
        }

        function move(e) {
            // update position upon move
            dxy = Utils.getCursorPosition(e);
        }

        function up(e) {
            // if there is dragging, do not close/open bellows
            if (dxy) {
                dx = xy.x - dxy.x;
                dy = xy.y - dxy.y;
                dxy = undefined;
                if ((dx*dx) + (dy*dy) > dragRadius*dragRadius) return;
            }

            // close or open item depending on active class
            var $item = $(this).parent();
            if ($item.hasClass(activeClass)) {
                close($item);
            }
            else {
                open($item);
            }
        }

        function click(e) {
            e.preventDefault();
        }


        // Auto-open items that are hash linked or have openedClass class
        var hash = location.hash;
        var $hashitem = $element.find('.' + headerClass + ' a[href="'+hash+'"]');

        if ($hashitem.length) {
            open($hashitem.parent());
        } else if ($element.find('.' + openedClass).length) {
            open($element.find('.' + openedClass));
        }

        var headerSelector = '.' + headerClass;
        $element
            .on(Utils.events.down, headerSelector, down)
            .on(Utils.events.move, headerSelector, move)
            .on(Utils.events.up, headerSelector, up)
            .on('click', headerSelector, click);
        if (Utils.events.transitionend) {
            $element.on(Utils.events.transitionend, '.' + contentClass, endTransition);
        }

        // API calls
        return {
            'settings': settings
            , 'open': open
            , 'close': close
            , 'recalculateItemHeight': recalculateItemHeight
        };
        
    };
                 
    Bellows.prototype.unbind = function() {
        this.$element.off();      
    }
                 
    Bellows.prototype.destroy = function() {
        this.unbind();
        this.$element.remove();
    }

    return Bellows;
    
})(Mobify.$, Mobify.UI.Utils);
    
(function($) {
    $.fn.bellows = function(options) {
        return this.each(function (i, elem) {
            var $this = $(this)
              , bellows = this.bellows;

            if (!bellows) {
                bellows = new Mobify.UI.Bellows(this, options); // pass through options
            } 

            this.bellows = bellows; // Provide the bellows object to callers
        })
    };
})(Mobify.$);
