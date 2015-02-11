require.config({
    baseUrl: '../../',
    paths: {
        'text': 'bower_components/requirejs-text/text',
        'glob': 'node_modules/requirejs-glob/lib/glob',
        'fixtures': 'tests/fixtures',
        '$': 'lib/zeptojs/dist/zepto.min',
        'chai': 'node_modules/chai/chai',
        'mocha': 'node_modules/mocha/mocha',
        'test-sandbox': 'tests/utils/test-sandbox'
    },
    'shim': {
        'mocha': {
            init: function() {
                this.mocha.setup('bdd');
                return this.mocha;
            }
        },
        '$': {
            exports: '$'
        }
    },
    glob: {
        middlewarePathPrefix: '/'
    }
});
