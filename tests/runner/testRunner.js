require(['config'], function(){
    require(['require',
             'chai',
             'mocha'],
    function(require, chai, mocha){

        var tests = [
            '../../tests/bellowsTests.js'
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
