(function($) {
    var pluginName = 'bellows';
    var noop = function() {};

    var itemClass = 'bellows__item';
    var itemContentClass = 'bellows__content';
    var openedClass = 'bellows--is-open';
    var openingClass = 'bellows--is-opening';
    var closingClass = 'bellows--is-closing';

    var selectors = {
        itemHeader: '> .bellows__item > .bellows__header',
        itemContentWrapper: '> .bellows__content-wrapper',
        itemContent: '> .bellows__item > .bellows__content'
    };

    function Bellows(element, options) {
        this._init(element, options);
    }

    Bellows.DEFAULTS = {
        singleItemOpen: false,
        event: 'tap',
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

        this.$bellows
            .find(selectors.itemContent)
            // wrap content section of each item to facilitate padding
            .wrap('<div class="bellows__content-wrapper" />')
            // add aria-hidden attribute to all hidden content wrappers
            .parents('.bellows__item:not(.bellows--is-open)')
            .find('.bellows__content-wrapper')
            .attr('aria-hidden', true);

        this._bindEvents();
    };

    Bellows.prototype._bindEvents = function() {
        var plugin = this;

        // We use tappy here to eliminate the 300ms delay on clicking elements
        this.$bellows
            .find(selectors.itemHeader)
            .bind(this.options.event, function(e) {
                e.preventDefault();

                plugin.toggle($(this).parent());
            });
    };

    Bellows.prototype.toggle = function($item) {
        $item = this._item($item);

        this[this._isItemOpen($item) ? 'close' : 'open']($item);
    };

    Bellows.prototype.open = function($item) {
        $item = this._item($item);

        if ($item.hasClass(openedClass)) {
            return;
        }

        var plugin = this;
        var $contentWrapper = $item.find(selectors.itemContentWrapper);

        if (this.options.singleItemOpen) {
            this.$bellows.find('.' + openedClass).each(function() {
                plugin.close($(this));
            });
        }

        this._trigger('open', { item: $item });

        $contentWrapper
            .velocity('slideDown', {
                begin: function() {
                    plugin._setHeight(plugin._getHeight(plugin.$bellows) + plugin._getHeight($contentWrapper));
                    $item.addClass(openingClass);
                    plugin.animating = true;
                },
                duration: this.options.duration,
                easing: this.options.easing,
                complete: function() {
                    plugin.animating = false;

                    $item
                        .removeClass(openingClass)
                        .addClass(openedClass)
                        .attr('aria-hidden', true);
                    plugin._resetItemStyle($contentWrapper);

                    plugin._trigger('opened', { item: $item });
                }
            });
    };

    Bellows.prototype.close = function($item) {
        $item = this._item($item);

        if (!$item.hasClass(openedClass)) {
            return;
        }

        var plugin = this;
        var $contentWrapper = $item.find(selectors.itemContentWrapper);

        this._trigger('close', { item: $item });

        $contentWrapper
            .velocity('slideUp', {
                begin: function() {
                    plugin._setHeight(plugin._getHeight(plugin.$bellows));
                    $item
                        .removeClass(openedClass)
                        .addClass(closingClass);

                    plugin.animating = true;
                },
                duration: this.options.duration,
                easing: this.options.easing,
                complete: function() {
                    plugin.animating = false;

                    $item
                        .removeClass(closingClass)
                        .removeAttr('aria-hidden');
                    plugin._resetItemStyle($contentWrapper);

                    plugin._trigger('closed', { item: $item });
                }
            });
    };

    Bellows.prototype._isItemOpen = function($item) {
        return $item.find(selectors.itemContentWrapper).height() > 0;
    };

    // Remove the style attributes from item and
    // bellows to allow the height to be auto
    Bellows.prototype._resetItemStyle = function($contentWrapper) {
        var plugin = this;

        plugin._setHeight();

        // hack to remove style after height has been toggled. Ensures that height is reset to auto
        // TODO: remove this once Velocity issue #183 is resolved
        setTimeout(function() {
            $contentWrapper.removeAttr('style');
        }, 250);
    };

    Bellows.prototype._getHeight = function($element) {
        return parseFloat($.Velocity.CSS.getPropertyValue($element[0], 'height'));
    };

    Bellows.prototype._setHeight = function(height) {
        this.$bellows.css('height', height || '');
    };

    // Allow items to be found using an index
    Bellows.prototype._item = function(item) {
        if (typeof item === 'number') {
            item = this.$bellows.find('.' + itemClass).eq(item);
        }

        return item;
    };

    Bellows.prototype._trigger = function(eventName, data) {
        eventName in this.options && this.options[eventName].call(this, $.Event(pluginName + ':' + eventName, { bubbles: false }), data);
    };

    // BELLOWS PLUGIN
    // =========================

    $.fn.bellows = function(option) {
        var args = Array.prototype.slice.call(arguments);

        return this.each(function() {
            var $this = $(this);
            var bellows = $this.data(pluginName);
            var isMethodCall = typeof option === 'string';

            if (!bellows) {
                if (isMethodCall) {
                    throw 'cannot call methods on bellows prior to initialization; attempted to call method "' + option + '"';
                }
                $this.data(pluginName, (bellows = new Bellows(this, option)));
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
})(window.jQuery || window.Zepto);
