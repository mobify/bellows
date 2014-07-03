define([
    'zepto',
    'bellows'
], function($) {
    var element;

    describe('Bellows plugin', function() {
        beforeEach(function() {
            element = $('<div class="bellows default"> <div class="bellows__item"> <div class="bellows__header"><h3>Header</h3></div> <div class="bellows__content"> <p>Content</p> </div> </div> <div class="bellows__item"> <div class="bellows__header"> <h3>Header</h3> </div> <div class="bellows__content"> <p>Content</p> </div> </div> </div>');
        });

        describe('binding to Zepto\'s fn', function() {
            it('defines Bellows in Zepto', function() {
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

            it('wraps each content section', function() {
                element.bellows();

                assert.lengthOf(element.find('.bellows__content-wrapper'), 2);
            });
        });
    });
});