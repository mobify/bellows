require.config({
    baseUrl: '../../',
    paths: {
        'text': 'node_modules/text/text',
        'glob': 'node_modules/requirejs-glob/lib/glob',
        'fixtures': 'tests/fixtures',
        '$': 'node_modules/jquery/dist/jquery',
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
