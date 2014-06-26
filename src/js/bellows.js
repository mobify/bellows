(function($) {
    var noop = function() {
    };

    function Bellows(element, options) {
        this.init(element, options);
    }

    Bellows.DEFAULTS = {
        singleNodeOpen: true,
        duration: 200,
        easing: 'swing',
        open: noop,
        opened: noop,
        close: noop,
        closed: noop
    };

    Bellows.prototype.init = function(element, options) {
        this.options = $.extend({}, Bellows.DEFAULTS, options);

        this.element = $(element);
        this.current = null;

        this.element.find('.bellows__content').wrap($('<div class="bellows__content-wrapper" />'));

        this._bindEvents();
    };

    Bellows.prototype._bindEvents = function() {
        var plugin = this;

        this.element.on('click', '.bellows__header', function() {
            plugin.toggle($(this).parent());
        });
    };

    Bellows.prototype.toggle = function(item) {
        item = this._item(item);

        this[item.hasClass('bellows--open') ? 'close' : 'open'](item);
    };

    Bellows.prototype.open = function(item) {
        item = this._item(item);

        if (item.hasClass('bellows--open')) {
            return;
        }

        var plugin = this;
        var $content = item.find('.bellows__content-wrapper');

        if (this.options.singleNodeOpen) {
            this.element.find('.bellows--open').each(function() {
                plugin.close($(this));
            });
        }

        this._trigger('open', { item: item });

        $content
            .velocity('slideDown',
            {
                duration: this.options.duration,
                easing: this.options.easing,
                complete: function() {
                    item.addClass('bellows--open');
                    $content.css('height', '');
                    plugin._trigger('opened', { item: item });
                }
            });
    };

    Bellows.prototype.close = function(item) {
        item = this._item(item);

        if (!item.hasClass('bellows--open')) {
            return;
        }

        var plugin = this;
        var $content = item
            .removeClass('bellows--open')
            .find('.bellows__content-wrapper');

        this._trigger('close', { item: item });

        $content.velocity('slideUp',
            {
                duration: this.options.duration,
                easing: this.options.easing,
                complete: function() {
                    $content.css('height', '');
                    plugin._trigger('closed', { item: item });
                }
            });
    };

    Bellows.prototype._item = function(item) {
        if (typeof item === 'number') {
            item = this.element.find('.bellows__item').eq(item);
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

    return $;
})(Zepto);
