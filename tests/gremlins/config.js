require.config({
    baseUrl: '../../',
    paths: {
        'text': 'bower_components/requirejs-text/text',
        'gremlins': 'bower_components/gremlins.js/gremlins.min',
        '$': 'lib/zeptojs/dist/zepto.min',
        'velocity': 'bower_components/mobify-velocity/velocity',
        'bellows': 'dist/bellows'
    },
    'shim': {
        '$': {
            exports: '$'
        }
    }
});
