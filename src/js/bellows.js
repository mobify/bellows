/*
 Bellows.js v2.0.0
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        /*
         In AMD environments, you will need to define an alias
         to your selector engine. i.e. either zepto or jQuery.
         */
        define([
            '$',
            'velocity',
            'plugin'
        ], factory);
    } else {
        /*
         Browser globals
         */
        var framework = window.Zepto || window.jQuery;
        factory(framework, framework.Velocity);
    }
}(function($, Velocity) {
    var ITEM_CLASS = 'bellows__item';
    var OPENED_CLASS = 'bellows--is-open';
    var OPENING_CLASS = 'bellows--is-opening';
    var CLOSING_CLASS = 'bellows--is-closing';

    var selectors = {
        ITEM_HEADER: '> .bellows__item > .bellows__header',
        ITEM_CONTENT_WRAPPER: '> .bellows__content-wrapper',
        ITEM_CONTENT: '> .bellows__item > .bellows__content'
    };

    function Bellows(element, options) {
        Bellows._super.call(this, element, options);
    }

    Bellows.VERSION = '2.0.0';

    Bellows.DEFAULTS = {
        singleItemOpen: false,
        event: 'click',
        duration: 200,
        easing: 'swing',
        open: $.noop,
        opened: $.noop,
        close: $.noop,
        closed: $.noop
    };

    $.plugin('bellows', Bellows, {
        _init: function(element, options) {
            this.options = $.extend(true, {}, Bellows.DEFAULTS, options);

            this.$bellows = $(element);

            this.$bellows
                .find(selectors.ITEM_CONTENT)
                // wrap content section of each item to facilitate padding
                .wrap('<div class="bellows__content-wrapper" />')
                // add aria-hidden attribute to all hidden content wrappers
                .parents('.bellows__item:not(.bellows--is-open)')
                .find(selectors.ITEM_CONTENT_WRAPPER)
                .attr('aria-hidden', true);

            this._bindEvents();
        },

        _bindEvents: function() {
            var plugin = this;

            // We use tappy here to eliminate the 300ms delay on clicking elements
            this.$bellows
                .find(selectors.ITEM_HEADER)
                .bind(this.options.event, function(e) {
                    e.preventDefault();

                    plugin.toggle($(this).parent());
                });
        },

        /*
         Gets an element's height using Velocity's built-in property cache.
         Used for getting heights before animations, for animating into an
         element's space.
         */
        _getHeight: function($element) {
            return parseFloat(Velocity.CSS.getPropertyValue($element[0], 'height'));
        },

        /*
         Sets the height of bellows so we animate into
         the space rather than re-flowing the entire document
         */
        _setHeight: function(height) {
            this.$bellows.css('height', height || '');
        },

        /*
         Allow items to be found using an index
         */
        _item: function(item) {
            if (typeof item === 'number') {
                item = this.$bellows.find('.' + ITEM_CLASS).eq(item);
            }

            return item;
        },

        toggle: function($item) {
            $item = this._item($item);

            this[$item.hasClass(OPENED_CLASS) ? 'close' : 'open']($item);
        },

        open: function($item) {
            $item = this._item($item);

            if ($item.hasClass(OPENED_CLASS)) {
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
                        $item.addClass(OPENING_CLASS);
                    },
                    duration: this.options.duration,
                    easing: this.options.easing,
                    complete: function() {
                        $item
                            .removeClass(OPENING_CLASS)
                            .addClass(OPENED_CLASS)
                            .find(selectors.ITEM_CONTENT_WRAPPER)
                            .removeAttr('aria-hidden');

                        plugin._setHeight();

                        plugin._trigger('opened', { item: $item });
                    }
                });
        },

        close: function($item) {
            $item = this._item($item);

            if (!$item.hasClass(OPENED_CLASS)) {
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
                            .removeClass(OPENED_CLASS)
                            .addClass(CLOSING_CLASS);
                    },
                    duration: this.options.duration,
                    easing: this.options.easing,
                    complete: function() {
                        $item
                            .removeClass(CLOSING_CLASS)
                            .find(selectors.ITEM_CONTENT_WRAPPER)
                            .attr('aria-hidden', true);

                        plugin._setHeight();

                        plugin._trigger('closed', { item: $item });
                    }
                });
        },

        closeAll: function() {
            var plugin = this;

            this.$bellows.find('.' + OPENED_CLASS).each(function() {
                plugin.close($(this));
            });
        }
    });

    $('[data-bellows]').bellows();

    return $;
}));
