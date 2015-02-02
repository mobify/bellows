define([
    'test-sandbox',
    'text!fixtures/bellows.html'
], function(testSandbox, fixture) {
    var Bellows;
    var $element;
    var $;

    describe('Bellows constructor', function() {
        beforeEach(function(done) {
            var setUpComplete = function(iFrame$) {
                $ = iFrame$;
                Bellows = $.fn.bellows.Constructor;
                $element = $(fixture);

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        it('creates a bellows instance', function() {
            var bellows = new Bellows($element);

            expect(bellows).to.be.defined;
        });
    });
});