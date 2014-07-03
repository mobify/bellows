define([
    'text!fixtures/bellows.html',
    'zepto',
    'velocity-shim',
    'velocity',
    'bellows'
], function(fixture, $) {
    var element;

    describe('Bellows events', function() {
        beforeEach(function() {
            element = $(fixture);
        });

        it('fires the open event when the header is clicked', function() {
            var triggered = false;

            element.bellows({
                open: function() {
                    triggered = true;
                }
            });

            element.find('.bellows__header').first().trigger('tap');

            assert.isTrue(triggered);
        });
    });
});