define([
    'text!fixtures/bellows.html',
    '$',
    'velocity',
    'bellows'
], function(fixture, $) {
    var Bellows;
    var element;

    describe('Bellows options', function() {
        beforeEach(function() {
            Bellows = $.fn.bellows.Constructor;
            element = $(fixture);
        });

        describe('creates default options when no options parameter not used', function() {
            it('correctly defines singleItemOpen', function() {
                var bellows = new Bellows(element);

                assert.isFalse(bellows.options.singleItemOpen);
                assert.isBoolean(bellows.options.singleItemOpen);
            });

            it('correctly defines duration', function() {
                var bellows = new Bellows(element);

                assert.equal(bellows.options.duration, 200);
                assert.isNumber(bellows.options.duration);
            });

            it('correctly defines easing', function() {
                var bellows = new Bellows(element);

                assert.equal(bellows.options.easing, 'swing');
                assert.isString(bellows.options.easing);
            });

            it('correctly defines events', function() {
                var bellows = new Bellows(element);

                assert.isFunction(bellows.options.open);
                assert.isFunction(bellows.options.opened);
                assert.isFunction(bellows.options.close);
                assert.isFunction(bellows.options.closed);
            });
        });

        describe('creates custom options when options parameter used', function() {
            it('correctly defines singleItemOpen as true', function() {
                var bellows = new Bellows(element, { singleItemOpen: true });

                assert.isTrue(bellows.options.singleItemOpen);
                assert.isBoolean(bellows.options.singleItemOpen);
            });

            it('correctly defines duration of 400', function() {
                var bellows = new Bellows(element, { duration: 400 });

                assert.equal(bellows.options.duration, 400);
                assert.isNumber(bellows.options.duration);
            });

            it('correctly defines easing as ease-in-out', function() {
                var bellows = new Bellows(element, { easing: 'ease-in-out'});

                assert.equal(bellows.options.easing, 'ease-in-out');
                assert.isString(bellows.options.easing);
            });

            it('correctly defines open event', function() {
                var open = function() {
                    console.log('I\'m open!')
                };
                var bellows = new Bellows(element, { open: open });

                assert.equal(bellows.options.open, open);
                assert.isFunction(bellows.options.open);
            });

            it('correctly defines open event', function() {
                var open = function() {
                    console.log('Open!')
                };
                var bellows = new Bellows(element, { open: open });

                assert.equal(bellows.options.open, open);
                assert.isFunction(bellows.options.open);
            });

            it('correctly defines opened event', function() {
                var opened = function() {
                    console.log('Opened!')
                };
                var bellows = new Bellows(element, { opened: opened });

                assert.equal(bellows.options.opened, opened);
                assert.isFunction(bellows.options.opened);
            });

            it('correctly defines close event', function() {
                var close = function() {
                    console.log('Close!')
                };
                var bellows = new Bellows(element, { close: close });

                assert.equal(bellows.options.close, close);
                assert.isFunction(bellows.options.close);
            });

            it('correctly defines closed event', function() {
                var closed = function() {
                    console.log('Closed!')
                };
                var bellows = new Bellows(element, { closed: closed });

                assert.equal(bellows.options.closed, closed);
                assert.isFunction(bellows.options.closed);
            });
        });
    });
});