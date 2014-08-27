define([
    'text!fixtures/bellows.html',
    '$',
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

        describe('invoking bellows methods before plugin is initialized', function() {
            it('throws when not initialized', function() {
                assert.throws(function() { element.bellows('open'); });
            });
        });

        describe('invoking bellows methods using the plugin interface', function() {
            it('opens a bellows item using the open method', function(done) {
                element.bellows({
                    opened: function(e, ui) {
                        assert.isTrue(ui.item.hasClass('bellows--is-open'));
                        done();
                    }
                });

                element.bellows('open', 0);
            });

            it('closes a bellows item using the close method', function(done) {
                element.bellows({
                    opened: function() {
                        element.bellows('close', 0);
                    },
                    closed: function(e, ui) {
                        assert.isFalse(ui.item.hasClass('bellows--is-open'));
                        done();
                    }
                });

                element.bellows('open', 0);
            });

            it('removes aria-hidden attribute when open', function(done) {
                element.bellows({
                    opened: function(e, ui) {
                        assert.isFalse(!!ui.item.find('.bellows__content-wrapper').attr('aria-hidden'));
                        done();
                    }
                });

                element.bellows('open', 0);
            });

            it('adds aria-hidden attribute when closed', function(done) {
                element.bellows({
                    opened: function() {
                        element.bellows('close', 0);
                    },
                    closed: function(e, ui) {
                        assert.isTrue(!!ui.item.find('.bellows__content-wrapper').attr('aria-hidden'));
                        done();
                    }
                });

                element.bellows('open', 0);
            });

            it('throws for method calls that don\'t exist', function() {
                assert.throws(function() { element.bellows().bellows('noMethod'); });
            });

            it('throws when attempting to invoke private methods', function() {
                assert.throws(function() { element.bellows().bellows('_init'); });
            });

            it('throws when attempting to invoke methods that aren\'t functions', function() {
                assert.throws(function() { element.bellows().bellows('singleItemOpen'); });
            });
        });
    });
});