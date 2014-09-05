(function(factory) {
    if (typeof define === 'function' && define.amd) {
        /*
         In AMD environments, you will need to define an alias
         to your selector engine. i.e. either zepto or jQuery.
         */
        define([
            '$',
            'velocity'
        ], factory);
    } else {
        /*
         Browser globals
         */
        var framework = window.Zepto || window.jQuery;
        factory(framework, framework.Velocity);
    }
}(function($, Velocity) {
    var PLUGIN_NAME = 'bellows';
    var noop = function() {
    };

    var cssClasses = {
        ITEM: 'bellows__item',
        HEADER: 'bellows__header',
        OPENED: 'bellows--is-open',
        OPENING: 'bellows--is-opening',
        CLOSING: 'bellows--is-closing'
    };

    var selectors = {
        ITEM_HEADER: '> .bellows__item > .bellows__header',
        ITEM_CONTENT_WRAPPER: '> .bellows__content-wrapper',
        ITEM_CONTENT: '> .bellows__item > .bellows__content'
    };

    function Bellows(element, options) {
        this._init(element, options);
    }

    Bellows.VERSION = '2.0.3';

    Bellows.DEFAULTS = {
        singleItemOpen: false,
        event: 'click',
        duration: 200,
        easing: 'swing',
        open: noop,
        opened: noop,
        close: noop,
        closed: noop
    };

    Bellows.prototype._init = function(element, options) {
        this.options = $.extend(true, {}, Bellows.DEFAULTS, options);

        this.$bellows = $(element);

        this._wrapContent(this.$bellows);

        this._bindEvents();
    };

    Bellows.prototype._bindEvents = function() {
        var plugin = this;

        /*
         Ghetto Event Delegation™

         Zepto doesn't support descendant selectors in event delegation,
         so we compare against the closest bellows to ensure we are invoking
         the event from a direct child, not a bellows child from a nested bellows.
         */
        this.$bellows
            .on(this.options.event, function(e) {
                var $target = $(e.target);
                var $closestBellows = $target.closest('.bellows');

                // We don't want to continue if we're clicking on an anchor
                if ($target.is('a') || !!$target.parents('a').length) {
                    return;
                }

                // We need to verify not only that we're inside the direct bellows of the item, but also if the item is a header/child of a header
                if ($closestBellows[0] === plugin.$bellows[0] && ($target.hasClass(cssClasses.HEADER) || !!$target.closest('.bellows__header').length)) {
                    e.preventDefault();

                    plugin.toggle($target.closest('.bellows__item'));
                }
            });
    };

    /*
     Gets an element's height using Velocity's built-in property cache.
     Used for getting heights before animations, for animating into an
     element's space.
     */
    Bellows.prototype._getHeight = function($element) {
        return parseFloat(Velocity.CSS.getPropertyValue($element[0], 'height'));
    };

    /*
     Sets the height of bellows so we animate into
     the space rather than re-flowing the entire document
     */
    Bellows.prototype._setHeight = function(height) {
        this.$bellows.css('height', height || '');
    };

    /*
     Allow items to be found using an index
     */
    Bellows.prototype._item = function(item) {
        if (typeof item === 'number') {
            item = this.$bellows.find('.' + cssClasses.ITEM).eq(item);
        }

        return item;
    };

    Bellows.prototype._wrapContent = function($items) {
        $items
            .find(selectors.ITEM_CONTENT)
            // wrap content section of each item to facilitate padding
            .wrap('<div class="bellows__content-wrapper" />')
                // add aria-hidden attribute to all hidden content wrappers
                .parents('.bellows__item:not(.bellows--is-open)')
                .find(selectors.ITEM_CONTENT_WRAPPER)
                .attr('aria-hidden', true);
    };

    /*
     Allows triggering of events, with the option to pass arbitrary data to the event handler.
     */
    Bellows.prototype._trigger = function(eventName, data) {
        eventName in this.options && this.options[eventName].call(this, $.Event(PLUGIN_NAME + ':' + eventName, { bubbles: false }), data);
    };

    Bellows.prototype.toggle = function($item) {
        $item = this._item($item);

        this[$item.hasClass(cssClasses.OPENED) ? 'close' : 'open']($item);
    };

    Bellows.prototype.open = function($item) {
        $item = this._item($item);

        if ($item.hasClass(cssClasses.OPENED)) {
            return;
        }

        var plugin = this;
        var $contentWrapper = $item.find(selectors.ITEM_CONTENT_WRAPPER);

        if (this.options.singleItemOpen) {
            this.closeAll();
        }

        this._trigger('open', { item: $item });

        Velocity
            .animate($contentWrapper, 'slideDown', {
                begin: function() {
                    plugin._setHeight(plugin._getHeight(plugin.$bellows) + plugin._getHeight($contentWrapper));
                    $item.addClass(cssClasses.OPENING);
                },
                duration: this.options.duration,
                easing: this.options.easing,
                complete: function() {
                    $item
                        .removeClass(cssClasses.OPENING)
                        .addClass(cssClasses.OPENED)
                        .find(selectors.ITEM_CONTENT_WRAPPER)
                        .removeAttr('aria-hidden');

                    plugin._setHeight();

                    plugin._trigger('opened', { item: $item });
                }
            });
    };

    Bellows.prototype.close = function($item) {
        $item = this._item($item);

        if (!$item.hasClass(cssClasses.OPENED)) {
            return;
        }

        var plugin = this;
        var $contentWrapper = $item.find(selectors.ITEM_CONTENT_WRAPPER);

        this._trigger('close', { item: $item });

        Velocity
            .animate($contentWrapper, 'slideUp', {
                begin: function() {
                    plugin._setHeight(plugin._getHeight(plugin.$bellows));
                    $item
                        .removeClass(cssClasses.OPENED)
                        .addClass(cssClasses.CLOSING);
                },
                duration: this.options.duration,
                easing: this.options.easing,
                complete: function() {
                    $item
                        .removeClass(cssClasses.CLOSING)
                        .find(selectors.ITEM_CONTENT_WRAPPER)
                        .attr('aria-hidden', true);

                    plugin._setHeight();

                    plugin._trigger('closed', { item: $item });
                }
            });
    };

    Bellows.prototype.closeAll = function() {
        var plugin = this;

        this.$bellows.find('.' + cssClasses.OPENED).each(function() {
            plugin.close($(this));
        });
    };

    Bellows.prototype.add = function(items, replace) {
        var $container = $('<div />');
        $(items).appendTo($container);

        replace && this.$bellows.empty();

        this._wrapContent($container);
        this.$bellows.append($container.children());
    };

    /*
     Bellows plugin definition
     */
    $.fn.bellows = function(option) {
        var args = Array.prototype.slice.call(arguments);

        return this.each(function() {
            var $this = $(this);
            var bellows = $this.data(PLUGIN_NAME);
            var isMethodCall = typeof option === 'string';

            // If bellows isn't initialized, we lazy-load initialize it. If it's
            // already initialized, we can safely ignore the call.
            if (!bellows) {
                if (isMethodCall) {
                    throw 'cannot call methods on bellows prior to initialization; attempted to call method "' + option + '"';
                }
                $this.data(PLUGIN_NAME, (bellows = new Bellows(this, option)));
            }

            // invoke a public method on bellows, and skip private methods
            if (isMethodCall) {
                if (option.charAt(0) === '_' || typeof bellows[option] !== 'function') {
                    throw 'no such method "' + option + '" for bellows';
                }

                bellows[option].apply(bellows, args.length > 1 ? args.slice(1) : null);
            }
        });
    };

    $.fn.bellows.Constructor = Bellows;

    $('[data-bellows]').bellows();

    return $;
}));
