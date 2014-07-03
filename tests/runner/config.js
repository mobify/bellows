require.config({
    baseUrl: '../../',
    paths: {
        'text': 'bower_components/requirejs-text/text',
        'fixtures': 'tests/fixtures',
        'zepto': 'lib/zeptojs/dist/zepto.min',
        'velocity': 'bower_components/velocity/jquery.velocity.min',
        'velocity-shim': 'lib/velocity.jquery-shim',
        'chai': 'node_modules/chai/chai',
        'mocha': 'node_modules/mocha/mocha',
        'bellows': 'dist/bellows'
    },
    'shim': {
        'mocha': {
            init: function() {
                this.mocha.setup('bdd');
                return this.mocha;
            }
        },
        'zepto': {
            exports: '$'
        },
        'velocity': {
            exports: '$'
        },
        'velocity-shim': {
            exports: '$'
        },
        'bellows': {
            exports: 'Bellows',
            deps: ['zepto']
        }
    }
});
