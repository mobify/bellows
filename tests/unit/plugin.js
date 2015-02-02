define([
    'iframe-fixture',
    'text!fixtures/bellows.html',
    'text!fixtures/items.html',
    'text!fixtures/item.html',
    'text!fixtures/disableditem.html'
], function(iframeFixture, fixture, items, item, disabledItem) {
    var Bellows;
    var $element;
    var $;

    describe('Bellows plugin', function() {
        beforeEach(function(done) {
            var setUp = function(iFrame$) {
                $ = iFrame$;
                Bellows = $.fn.bellows.Constructor;
                $element = $(fixture).appendTo('#container');

                done();
            };

            iframeFixture.setUp('iframe-bellows', setUp);
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
            it('creates bellows instance on $element', function() {
                $element.bellows();

                assert.isDefined($element.data('bellows'));
            });

            it('stores $element inside instance', function() {
                $element.bellows();

                assert.isDefined($element.data('bellows').$bellows);
            });

            it('wraps each content section with correct CSS class', function() {
                $element.bellows();

                assert.lengthOf($element.find('.bellows__content-wrapper'), 2);
            });
        });

        describe('invoking bellows methods before plugin is initialized', function() {
            it('throws when not initialized', function() {
                assert.throws(function() { $element.bellows('open'); });
            });
        });

        describe('invoking bellows methods using the plugin interface', function() {
            it('opens a bellows item using the open method', function(done) {
                $element.bellows({
                    opened: function(e, ui) {
                        assert.isTrue(ui.item.hasClass('bellows--is-open'));
                        done();
                    }
                });

                $element.bellows('open', 0);
            });

            it('closes a bellows item using the close method', function(done) {
                $element.bellows({
                    opened: function() {
                        $element.bellows('close', 0);
                    },
                    closed: function(e, ui) {
                        assert.isFalse(ui.item.hasClass('bellows--is-open'));
                        done();
                    }
                });

                $element.bellows('open', 0);
            });

            it('removes aria-hidden attribute when open', function(done) {
                $element.bellows({
                    opened: function(e, ui) {
                        assert.isFalse(!!ui.item.find('.bellows__content-wrapper').attr('aria-hidden'));
                        done();
                    }
                });

                $element.bellows('open', 0);
            });

            it('adds aria-hidden attribute when closed', function(done) {
                $element.bellows({
                    opened: function() {
                        $element.bellows('close', 0);
                    },
                    closed: function(e, ui) {
                        assert.isTrue(!!ui.item.find('.bellows__content-wrapper').attr('aria-hidden'));
                        done();
                    }
                });

                $element.bellows('open', 0);
            });

            it('enables handlers for dynamically added items', function(done) {
                $element.bellows({
                    open: function() {
                        done();
                    }
                });

                $element.bellows('add', items);
                $element
                    .find('.bellows__header:eq(3)')
                    .trigger('click');
            });

            it('replaces items when adding with replace', function() {
                $element.bellows();

                $element.bellows('add', item, true);

                assert.equal($element.find('.bellows__item').length, 1);
            });

            it('throws for method calls that don\'t exist', function() {
                assert.throws(function() { $element.bellows().bellows('noMethod'); });
            });

            it('throws when attempting to invoke private methods', function() {
                assert.throws(function() { $element.bellows().bellows('_init'); });
            });

            it('throws when attempting to invoke methods that aren\'t functions', function() {
                assert.throws(function() { $element.bellows().bellows('singleItemOpen'); });
            });
        });

        describe('disabling a bellows item', function() {
            it('does not open item when header clicked', function(done) {
                $element.bellows();

                var $disabledItem = $(disabledItem);

                $element.bellows('add', $disabledItem);

                $disabledItem
                    .find('.bellows__header')
                    .trigger('click');

                setTimeout(function() {
                    assert.isTrue($disabledItem.hasClass('bellows--is-disabled'));
                    assert.isFalse($disabledItem.hasClass('bellows--is-open'));
                    done();
                });
            });
        });
    });
});