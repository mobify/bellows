require.config({
    baseUrl: '../',
    paths: {
        'text': 'bower_components/requirejs-text/text',
        'selectorEngine': 'lib/zeptojs/dist/zepto.min',
        'zappy': 'bower_components/tappy/tappy',
        'velocity-shim': 'lib/velocity-shim',
        'velocity': 'bower_components/velocity/jquery.velocity',
        'bellows': 'dist/bellows'
    },
    'shim': {
        'selectorEngine': {
            exports: '$'
        },
        'zappy': {
            deps: ['selectorEngine'],
            exports: '$'
        },
        'velocity-shim': {
            deps: ['selectorEngine'],
            exports: '$'
        },
        'velocity': {
            deps: ['selectorEngine', 'velocity-shim'],
            exports: '$'
        }
    }
});
