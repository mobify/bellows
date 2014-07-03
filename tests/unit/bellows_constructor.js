define([
    'zepto',
    'bellows'
], function($) {
    var Bellows;
    var element;

    describe('Bellows constructor', function() {
        beforeEach(function() {
            Bellows = $.fn.bellows.Constructor;
            element = $('<div class="bellows default"> <div class="bellows__item"> <div class="bellows__header"><h3>Header</h3></div> <div class="bellows__content"> <p>Content</p> </div> </div> <div class="bellows__item"> <div class="bellows__header"> <h3>Header</h3> </div> <div class="bellows__content"> <p>Content</p> </div> </div> </div>');
        });

        it('creates a bellows instance', function() {
            var bellows = new Bellows(element);

            assert.isDefined(bellows);
        });
    });
});