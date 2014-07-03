
require(['config'], function() {
    require([
        'require',
         'chai',
         'mocha'
    ],
    function(require, chai, mocha) {

        var tests = [
            '../../tests/unit/bellows_constructor.js',
            '../../tests/unit/bellows_plugin.js',
            '../../tests/unit/bellows_options.js',
            '../../tests/unit/bellows_events.js'
        ];

        require(tests, function() {
            assert = chai.assert;

            if (window.mochaPhantomJS) {
                return window.mochaPhantomJS.run();
            }
            mocha.run();
        });
    });
});
