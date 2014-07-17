require.config({
    baseUrl: '../../',
    paths: {
        'text': 'bower_components/requirejs-text/text',
        'fixtures': 'tests/fixtures',
        'zepto': 'lib/zeptojs/dist/zepto.min',
        'zappy': 'bower_components/tappy/tappy',
        'velocity-shim': 'lib/velocity-shim',
        'velocity': 'bower_components/velocity/jquery.velocity',
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
        'zappy': {
            deps: ['zepto'],
            exports: '$'
        },
        'velocity-shim': {
            deps: ['zepto'],
            exports: '$'
        },
        'velocity': {
            deps: ['zepto', 'velocity-shim'],
            exports: '$'
        },
        'bellows': {
            deps: ['zappy', 'velocity'],
            exports: 'Bellows'
        }
    }
});
