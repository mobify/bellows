require.config({
    baseUrl: '../../',
    paths: {
        'text': 'bower_components/requirejs-text/text',
        'fixtures': 'tests/fixtures',
        '$': 'lib/zeptojs/dist/zepto',
        'velocity': 'bower_components/mobify-velocity/velocity',
        'chai': 'node_modules/chai/chai',
        'mocha': 'node_modules/mocha/mocha',
        'plugin': 'bower_components/plugin/dist/plugin',
        'bellows': 'dist/bellows'
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
    }
});
