require.config({
    baseUrl: '../../',
    paths: {
        'zepto': 'lib/zeptojs/dist/zepto.min',
        'chai': 'node_modules/chai/chai',
        'mocha': 'node_modules/mocha/mocha',
        'bellows': 'dist/bellows.min'
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
        'bellows': {
            exports: 'Bellows',
            deps: ['zepto']
        }
    }
});
