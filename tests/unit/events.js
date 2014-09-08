define([
    'text!fixtures/bellows.html',
    '$',
    'velocity',
    'bellows'
], function(fixture, $) {
    var element;

    describe('Bellows events', function() {
        var stringify = JSON.stringify;

        before(function() {
            JSON.stringify = function(obj) {
                var seen = [];

                return stringify(obj, function(key, val) {
                    if (typeof val === "object") {
                        if (seen.indexOf(val) >= 0) { return; }
                        seen.push(val);
                    }
                    return val;
                });
            };
        });

        after(function() {
            JSON.stringify = stringify;
        });

        beforeEach(function() {
            element = $(fixture).appendTo('#container');
        });

        afterEach(function() {
            element = null;
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