define([
    'text!fixtures/bellows.html',
    '$',
    'velocity',
    'bellows'
], function(fixture, $) {
    var element;

    describe('Bellows events', function() {
        beforeEach(function() {
            element = $(fixture);
        });

        it('fires the open event when the header is clicked', function(done) {
            element.bellows({
                open: function() {
                    done();
                }
            });

            element.find('.bellows__header').first().trigger('click');
        });

        it('fires the opened event when the header is clicked', function(done) {
            element.bellows({
                opened: function() {
                    done();
                }
            });

            element.find('.bellows__header').first().trigger('click');
        });

        it('fires the close event when the header is clicked', function(done) {
            element.bellows({
                opened: function(e, ui) {
                    ui.item.find('.bellows__header').trigger('click');
                },
                close: function() {
                    done();
                }
            });

            element.find('.bellows__header').first().trigger('click');
        });

        it('fires the closed event when the header is clicked', function(done) {
            element.bellows({
                opened: function(e, ui) {
                    ui.item.find('.bellows__header').trigger('click');
                },
                closed: function() {
                    done();
                }
            });

            element.find('.bellows__header').first().trigger('click');
        });
    });
});