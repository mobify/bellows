define([
    'test-sandbox',
    'text!fixtures/bellows.html'
], function(testSandbox, fixture) {
    var Bellows;
    var $element;
    var $;

    describe('Bellows options', function() {
        beforeEach(function(done) {
            var setUpComplete = function(iFrame$) {
                $ = iFrame$;
                Bellows = $.fn.bellows.Constructor;
                $element = $(fixture);

                done();
            };

            testSandbox.setUp('sandbox', setUpComplete);
        });

        describe('creates default options when no options parameter not used', function() {
            it('correctly defines singleItemOpen', function() {
                var bellows = new Bellows($element);

                expect(bellows.options.singleItemOpen).to.be.false;
                expect(bellows.options.singleItemOpen).to.be.a('boolean');
            });

            it('correctly defines duration', function() {
                var bellows = new Bellows($element);

                expect(bellows.options.duration).to.equal(200);
                expect(bellows.options.duration).to.be.a('number');
            });

            it('correctly defines easing', function() {
                var bellows = new Bellows($element);

                expect(bellows.options.easing).to.equal('swing');
                expect(bellows.options.easing).to.be.a('string');
            });

            it('correctly defines events', function() {
                var bellows = new Bellows($element);

                expect(bellows.options.open).to.be.a('function');
                expect(bellows.options.opened).to.be.a('function');
                expect(bellows.options.close).to.be.a('function');
                expect(bellows.options.closed).to.be.a('function');
            });
        });

        describe('creates custom options when options parameter used', function() {
            it('correctly defines singleItemOpen as true', function() {
                var bellows = new Bellows($element, { singleItemOpen: true });

                expect(bellows.options.singleItemOpen).to.be.true;
                expect(bellows.options.singleItemOpen).to.be.a('boolean');
            });

            it('correctly defines duration of 400', function() {
                var bellows = new Bellows($element, { duration: 400 });

                expect(bellows.options.duration).to.equal(400);
                expect(bellows.options.duration).to.be.a('number');
            });

            it('correctly defines easing as ease-in-out', function() {
                var bellows = new Bellows($element, { easing: 'ease-in-out'});

                expect(bellows.options.easing).to.equal('ease-in-out');
                expect(bellows.options.easing).to.be.a('string');
            });

            it('correctly defines open event', function() {
                var open = function() {
                    console.log('I\'m open!')
                };
                var bellows = new Bellows($element, { open: open });

                expect(bellows.options.open).to.equal(open);
                expect(bellows.options.open).to.be.a('function');
            });

            it('correctly defines open event', function() {
                var open = function() {
                    console.log('Open!')
                };
                var bellows = new Bellows($element, { open: open });

                expect(bellows.options.open).to.equal(open);
                expect(bellows.options.open).to.be.a('function');
            });

            it('correctly defines opened event', function() {
                var opened = function() {
                    console.log('Opened!')
                };
                var bellows = new Bellows($element, { opened: opened });

                expect(bellows.options.opened).to.equal(opened);
                expect(bellows.options.opened).to.be.a('function');
            });

            it('correctly defines close event', function() {
                var close = function() {
                    console.log('Close!')
                };
                var bellows = new Bellows($element, { close: close });

                expect(bellows.options.close).to.equal(close);
                expect(bellows.options.close).to.be.a('function');
            });

            it('correctly defines closed event', function() {
                var closed = function() {
                    console.log('Closed!')
                };
                var bellows = new Bellows($element, { closed: closed });

                expect(bellows.options.closed).to.equal(closed);
                expect(bellows.options.closed).to.be.a('function');
            });
        });
    });
});