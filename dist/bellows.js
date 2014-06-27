(function($) {
    var noop = function() {};
    var openedClass = 'bellows--open';

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

        this.$element = $(element)
            .find('> .bellows__item > .bellows__content')
            .wrap('<div class="bellows__content-wrapper" />')
            .end();

        this._bindEvents();
    };

    Bellows.prototype._bindEvents = function() {
        var plugin = this;

        this.$element.find('> .bellows__item > .bellows__header').on('click', function() {
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
        var $contentWrapper = item.find('> .bellows__content-wrapper');
        var $content = $contentWrapper.find('.bellows__content');
        var contentHeight = $content.height()

        if (this.options.singleItemOpen) {
            this.$element.find('.' + openedClass).each(function() {
                plugin.close($(this));
            });
        }

        this._trigger('open', { item: item });

        // Jump content down and then animate into the space
        item.parent('.bellows').css('height', item.parent('.bellows').height() + contentHeight);

        $contentWrapper
            .velocity('slideDown',
            {
                duration: this.options.duration,
                easing: this.options.easing,
                complete: function() {
                    item.addClass(openedClass);
                    $contentWrapper.removeAttr('style');
                    item.parent('.bellows').css('height', '');
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
            .find('> .bellows__content-wrapper');
        var $content = $contentWrapper.find('.bellows__content');
        var contentHeight = $content.height();

        this._trigger('close', { item: item });

        $contentWrapper.velocity('slideUp',
            {
                begin: function() {
                    item.parent('.bellows').css('height', item.parent('.bellows').height());
                },
                duration: this.options.duration,
                easing: this.options.easing,
                complete: function() {
                    $contentWrapper.removeAttr('style');
                    plugin._trigger('closed', { item: item });
                    item.parent('.bellows').css('height', '');
                }
            });
    };

    Bellows.prototype._item = function(item) {
        if (typeof item === 'number') {
            item = this.$element.find('.bellows__item').eq(item);
        }

        return item;
    };

    Bellows.prototype._trigger = function(eventName, data) {
        eventName in this.options && this.options[eventName].call(this, $.Event('bellows:' + eventName, { bubbles: false }), data);
    };

    // BELLOWS PLUGIN
    // =========================

    $.fn.bellows = function(option) {
        var args = Array.prototype.slice.call(arguments);

        return this.each(function() {
            var $this = $(this);
            var bellows = $this.data('bellows');

            if (!bellows) {
                $this.data('bellows', (bellows = new Bellows(this, option)));
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
