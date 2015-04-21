(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([
            '$',
            'velocity',
            'plugin'
        ], factory);
    } else {
        var framework = window.Zepto || window.jQuery;
        factory(framework, framework.Velocity, window.Plugin);
    }
}(function($, Velocity, Plugin) {
    var cssClasses = {
        ITEM: 'bellows__item',
        HEADER: 'bellows__header',
        OPENED: 'bellows--is-open',
        OPENING: 'bellows--is-opening',
        CLOSING: 'bellows--is-closing',
        DISABLED: 'bellows--is-disabled'
    };

    var selectors = {
        ITEM_HEADER: '> .bellows__item > .bellows__header',
        ITEM_CONTENT_WRAPPER: '> .bellows__content-wrapper',
        ITEM_CONTENT: '> .bellows__item > .bellows__content'
    };

    var events = {
        CLICK: 'click.bellows'
    };

    function Bellows(element, options) {
        Bellows.__super__.call(this, element, options, Bellows.DEFAULTS);
    }

    Bellows.VERSION = '5.1.2';

    Bellows.DEFAULTS = {
        singleItemOpen: false,
        duration: 200,
        easing: 'swing',
        open: $.noop,
        opened: $.noop,
        close: $.noop,
        closed: $.noop
    };

    Plugin.create('bellows', Bellows, {

        _init: function(element) {
            this.$bellows = $(element);

            this._wrapContent(this.$bellows);

            this._bindEvents();
        },

        destroy: function() {
            this.$bellows
                .removeData(this.name)
                .off(events.CLICK);
        },

        _bindEvents: function() {
            var plugin = this;

            /**
             * Ghetto Event Delegation™

             Zepto doesn't support descendant selectors in event delegation,
             so we compare against the closest bellows to ensure we are invoking
             the event from a direct child, not a bellows child from a nested bellows.
             */
            this.$bellows
                .on(events.CLICK, function(e) {
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
                item = this.$bellows.find('.' + cssClasses.ITEM).eq(item);
            }

            return item;
        },

        _isOpen: function($item) {
            return $item.hasClass(cssClasses.OPENED);
        },

        _isDisabled: function($item) {
            return $item.hasClass(cssClasses.DISABLED);
        },

        _wrapContent: function($items) {
            $items
                .find(selectors.ITEM_CONTENT)
                // wrap content section of each item to facilitate padding
                .wrap('<div class="bellows__content-wrapper" />')
                // add aria-hidden attribute to all hidden content wrappers
                .parents('.bellows__item:not(.bellows--is-open)')
                .find(selectors.ITEM_CONTENT_WRAPPER)
                .attr('aria-hidden', true);
        },

        toggle: function($item) {
            $item = this._item($item);

            this[$item.hasClass(cssClasses.OPENED) ? 'close' : 'open']($item);
        },

        open: function($item) {
            $item = this._item($item);

            if (this._isOpen($item) || this._isDisabled($item)) {
                return;
            }

            var plugin = this;
            var $contentWrapper = $item.find(selectors.ITEM_CONTENT_WRAPPER);

            if (this.options.singleItemOpen) {
                this.closeAll();
            }

            this._trigger('open', {item: $item});

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

                        plugin._trigger('opened', {item: $item});
                    }
                });
        },

        close: function($item) {
            $item = this._item($item);

            if (!this._isOpen($item) || this._isDisabled($item)) {
                return;
            }

            var plugin = this;
            var $contentWrapper = $item.find(selectors.ITEM_CONTENT_WRAPPER);

            this._trigger('close', {item: $item});

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

                        plugin._trigger('closed', {item: $item});
                    }
                });
        },

        toggleAll: function() {
            var plugin = this;

            this.$bellows.find('.' + cssClasses.ITEM).each(function() {
                plugin.toggle($(this));
            });
        },

        openAll: function() {
            var plugin = this;

            this.$bellows.find('.' + cssClasses.ITEM + ':not(.' + cssClasses.OPENED + ')').each(function() {
                plugin.open($(this));
            });
        },

        closeAll: function() {
            var plugin = this;

            this.$bellows.find('.' + cssClasses.OPENED).each(function() {
                plugin.close($(this));
            });
        },

        add: function(items, replace) {
            var $container = $('<div />');
            $(items).appendTo($container);

            replace && this.$bellows.empty();

            this._wrapContent($container);
            this.$bellows.append($container.children());
        }
    });

    $('[data-bellows]').bellows();

    return $;
}));
