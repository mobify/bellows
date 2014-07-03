define([
    'zepto',
    'bellows'
],function($) {
    var element;

    describe('Bellows plugin', function() {
        beforeEach(function() {
            element = $('<div class="bellows"></div>');
        });

        it('attaches bellows to Zepto\'s fn', function() {
            var bellows = $.fn.bellows;

            assert.isDefined(bellows);
        });

        it('defines bellows as a function', function() {
            var bellows = $.fn.bellows;

            assert.isFunction(bellows);
        });
    });
});