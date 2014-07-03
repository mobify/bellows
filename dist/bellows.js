(function($) {
    var pluginName = 'bellows';
    var noop = function() {};

    var itemClass = '.bellows__item';
    var openedClass = 'bellows--open';
    var openingClass = 'bellows--opening';
    var closingClass = 'bellows--closing';

    var itemHeaderSelector = '> .bellows__item > .bellows__header';
    var itemContentWrapperSelector = '> .bellows__content-wrapper';
    var itemContentSelector = '> .bellows__item > .bellows__content';

    function Bellows(element, options) {
        this.init(element, options);
    }

    Bellows.DEFAULTS = {
        singleItemOpen: false,
        duration: 200,
        easing: 'swing',
        open: noop,
        opened: noop,
        close: noop,
        closed: noop
    };

    Bellows.prototype.init = function(element, options) {
        this.options = $.extend({}, Bellows.DEFAULTS, options);

        this.$bellows = $(element)
            .find(itemContentSelector)
            .wrap('<div class="bellows__content-wrapper" />')
            .end();

        this._bindEvents();
    };

    Bellows.prototype._bindEvents = function() {
        var plugin = this;

        this.$bellows.find(itemHeaderSelector).on('click.' + pluginName, function() {
            plugin.toggle($(this).parent());
        });
    };

    Bellows.prototype.toggle = function(item) {
        item = this._item(item);

        this[item.hasClass(openedClass) ? 'close' : 'open'](item);
    };

    Bellows.prototype.open = function(item) {
        item = this._item(item);

        if (item.hasClass(openedClass)) {
            return;
        }

        var plugin = this;
        var $contentWrapper = item.find(itemContentWrapperSelector);
        var $content = $contentWrapper.find('.bellows__content');

        if (this.options.singleItemOpen) {
            this.$bellows.find('.' + openedClass).each(function() {
                plugin.close($(this));
            });
        }

        this._trigger('open', { item: item });

        // Jump content down and then animate into the space
        this.$bellows.css('height', this.$bellows.height() + $content.height());

        $contentWrapper.velocity('slideDown', {
            begin: function() {
                item.addClass(openingClass);
            },
            duration: this.options.duration,
            easing: this.options.easing,
            complete: function() {
                item
                    .removeClass(openingClass)
                    .addClass(openedClass);
                plugin.$bellows.css('height', '');
                $contentWrapper.removeAttr('style');
                plugin._trigger('opened', { item: item });
            }
        });
    };

    Bellows.prototype.close = function(item) {
        item = this._item(item);

        if (!item.hasClass(openedClass)) {
            return;
        }

        var plugin = this;
        var $contentWrapper = item
            .removeClass(openedClass)
            .find(itemContentWrapperSelector);

        this._trigger('close', { item: item });

        $contentWrapper.velocity('slideUp', {
            begin: function() {
                item.addClass(closingClass);
                plugin.$bellows.css('height', plugin.$bellows.height());
            },
            duration: this.options.duration,
            easing: this.options.easing,
            complete: function() {
                $contentWrapper.removeAttr('style');
                plugin.$bellows.css('height', '');
                item.removeClass(closingClass);
                plugin._trigger('closed', { item: item });
            }
        });
    };

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
            if (typeof option === 'string') {
                bellows[option].apply(bellows, args.length > 1 ? args.slice(1) : null);
            }
        });
    };

    $.fn.bellows.Constructor = Bellows;

    $('[data-bellows]').bellows();

    return $;
})(Zepto);
