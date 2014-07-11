(function($) {
    var pluginName = 'bellows';
    var noop = function() {};

    var itemClass = '.bellows__item';
    var itemContentClass = '.bellows__content';
    var openedClass = 'bellows--is-open';
    var openingClass = 'bellows--is-opening';
    var closingClass = 'bellows--is-closing';

    var selectors = {
        itemHeader: '> .bellows__item > .bellows__header',
        itemContentWrapper: '> .bellows__content-wrapper',
        itemContent: '> .bellows__item > .bellows__content'
    };

    function Bellows(element, options) {
        this.init(element, options);
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

    Bellows.prototype.init = function(element, options) {
        this.options = $.extend(true, {}, Bellows.DEFAULTS, options);

        this.$bellows = $(element)
            .find(selectors.itemContent)
            // wrap content section of each item to facilitate padding
            .wrap('<div class="bellows__content-wrapper" />')
            .end();

        this._bindEvents();
    };

    Bellows.prototype._bindEvents = function() {
        var plugin = this;

        // We use tappy here to eliminate the 300ms delay on clicking elements
        this.$bellows
            .find(selectors.itemHeader)
            .bind(this.options.event, function(e) {
                e.preventDefault();

                !plugin.animating && plugin.toggle($(this).parent());
            });
    };

    Bellows.prototype.toggle = function(item) {
        item = this._item(item);

        this[item.hasClass(openedClass) ? 'close' : 'open'](item);
    };

    Bellows.prototype.open = function($item) {
        $item = this._item($item);

        if ($item.hasClass(openedClass)) {
            return;
        }

        var plugin = this;
        var $contentWrapper = $item.find(selectors.itemContentWrapper);
        var $content = $contentWrapper.find(itemContentClass);

        if (this.options.singleItemOpen) {
            this.$bellows.find('.' + openedClass).each(function() {
                plugin.close($(this));
            });
        }

        this._trigger('open', { item: $item });

        $contentWrapper
            .velocity('slideDown', {
                begin: function() {
                    plugin._setHeight(
                        parseFloat($.Velocity.CSS.getPropertyValue(plugin.$bellows[0], 'height')) + parseFloat($.Velocity.CSS.getPropertyValue($contentWrapper[0], 'height'))
                    );
                    $item.addClass(openingClass);
                    plugin.animating = true;
                },
                duration: this.options.duration,
                easing: this.options.easing,
                complete: function() {
                    plugin.animating = false;
                    $item
                        .removeClass(openingClass)
                        .addClass(openedClass);
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
                    plugin._setHeight(
                        $.Velocity.CSS.getPropertyValue(plugin.$bellows[0], 'height')
                    );
                    $item.addClass(closingClass);
                    plugin.animating = true;
                },
                duration: this.options.duration,
                easing: this.options.easing,
                complete: function() {
                    plugin.animating = false;
                    $item
                        .removeClass(closingClass)
                        .removeClass(openedClass);
                    plugin._resetItemStyle($contentWrapper);

                    plugin._trigger('closed', { item: $item });
                }
            });
    };

    // Remove the style attributes from item and
    // bellows to allow the height to be auto
    Bellows.prototype._resetItemStyle = function($contentWrapper) {
        var plugin = this;

        $contentWrapper.removeAttr('style');
        plugin._setHeight();
    };

    Bellows.prototype._setHeight = function(height) {
        this.$bellows.css('height', height || '');
    };

    // Allow items to be found using an index
    Bellows.prototype._item = function(item) {
        if (typeof item === 'number') {
            item = this.$bellows.find(itemClass).eq(item);
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

            if (!bellows) {
                $this.data(pluginName, (bellows = new Bellows(this, option)));
            }

            // invoke a public method on bellows, and skip private methods
            if (typeof option === 'string' && option.indexOf('_') !== 0) {
                bellows[option].apply(bellows, args.length > 1 ? args.slice(1) : null);
            }
        });
    };

    $.fn.bellows.Constructor = Bellows;

    $('[data-bellows]').bellows();

    return $;
})(window.jQuery || window.Zepto);
