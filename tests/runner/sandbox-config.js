require.config({
    baseUrl: '../../',
    paths: {
        'text': 'node_modules/text/text',
        'fixtures': 'tests/fixtures',
        '$': 'node_modules/jquery/dist/jquery',
        'velocity': 'node_modules/velocity-animate/velocity',
        'chai': 'node_modules/chai/chai',
        'mocha': 'node_modules/mocha/mocha',
        'plugin': 'node_modules/plugin/dist/plugin',
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
