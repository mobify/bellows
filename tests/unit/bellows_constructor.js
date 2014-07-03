define([
    'zepto',
    'bellows'
],function($) {
    var Bellows;
    var element;

    describe('Bellows constructor', function() {
        beforeEach(function() {
            Bellows = $.fn.bellows.Constructor;
            element = $('<div class="bellows"></div>');
        });

        it('creates a bellows instance', function() {
            var bellows = new Bellows(element);

            assert.isDefined(bellows);
        });
    });
});