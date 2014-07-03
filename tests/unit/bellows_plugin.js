define([
    'text!fixtures/bellows.html',
    'zepto',
    'velocity-shim',
    'velocity',
    'bellows'
], function(fixture, $) {
    var element;

    describe('Bellows plugin', function() {
        beforeEach(function() {
            element = $(fixture);
        });

        describe('binding to Zepto\'s fn', function() {
            it('defines bellows in Zepto', function() {
                var bellows = $.fn.bellows;

                assert.isDefined(bellows);
            });

            it('defines bellows as a function', function() {
                var bellows = $.fn.bellows;

                assert.isFunction(bellows);
            });
        });

        describe('invoking bellows', function() {
            it('creates bellows instance on element', function() {
                element.bellows();

                assert.isDefined(element.data('bellows'));
            });

            it('stores element inside instance', function() {
                element.bellows();

                assert.isDefined(element.data('bellows').$bellows);
            });

            it('wraps each content section with correct CSS class', function() {
                element.bellows();

                assert.lengthOf(element.find('.bellows__content-wrapper'), 2);
            });
        });

        describe('invoking bellows methods using the plugin interface', function() {
            it('opens a bellows item using the open method', function() {
                element.bellows({
                    opened: function() {
                        assert.isTrue(element.find('.bellows__item').first().hasClass('bellows--is-open'));
                    }
                });

                element.bellows('open', 1);
            });
        });
    });
});