require(['test-config'], function() {
    require([
            'require',
            'chai',
            'mocha'
        ],
        function(require, chai, mocha) {
            require(['glob!tests/unit/*.js'], function() {
                window.expect = chai.expect;

                if (window.mochaPhantomJS) {
                    return window.mochaPhantomJS.run();
                }
                mocha.run();
            });
        });
});
