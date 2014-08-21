require.config({
    baseUrl: '../',
    paths: {
        'text': 'bower_components/requirejs-text/text',
        '$': 'lib/zeptojs/dist/zepto.min',
        'velocity': 'bower_components/velocity/velocity',
        'bellows': 'dist/bellows'
    },
    'shim': {
        '$': {
            exports: '$'
        }
    }
});
