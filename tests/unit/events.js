define([
    'test-sandbox',
    'text!fixtures/bellows.html'
], function(testSandbox, fixture) {
    var Bellows;
    var $element;
    var $;

    describe('Bellows constructor', function() {
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

        beforeEach(function(done) {
            var setUpComplete = function(iFrame$) {
                $ = iFrame$;
                Bellows = $.fn.bellows.Constructor;
                $element = $(fixture).appendTo('#container');

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        it('fires the open event when the header is clicked', function(done) {
            $element.bellows({
                open: function() {
                    done();
                }
            });

            $element.find('.bellows__header').first().trigger('click');
        });

        it('fires the opened event when the header is clicked', function(done) {
            $element.bellows({
                opened: function() {
                    done();
                }
            });

            $element.find('.bellows__header').first().trigger('click');
        });

        it('fires the close event when the header is clicked', function(done) {
            $element.bellows({
                opened: function(e, ui) {
                    ui.item.find('.bellows__header').trigger('click');
                },
                close: function() {
                    done();
                }
            });

            $element.find('.bellows__header').first().trigger('click');
        });

        it('fires the closed event when the header is clicked', function(done) {
            $element.bellows({
                opened: function(e, ui) {
                    ui.item.find('.bellows__header').trigger('click');
                },
                closed: function() {
                    done();
                }
            });

            $element.find('.bellows__header').first().trigger('click');
        });
    });
});