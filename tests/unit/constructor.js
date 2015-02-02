define([
    'iframe-fixture',
    'text!fixtures/bellows.html'
], function(iframeFixture, fixture) {
    var Bellows;
    var $element;
    var $;

    describe('Bellows constructor', function() {
        beforeEach(function(done) {
            var setUp = function(iFrame$) {
                $ = iFrame$;
                Bellows = $.fn.bellows.Constructor;
                $element = $(fixture);

                done();
            };

            iframeFixture.setUp('iframe-bellows', setUp);
        });

        it('creates a bellows instance', function() {
            var bellows = new Bellows($element);

            assert.isDefined(bellows);
        });
    });
});