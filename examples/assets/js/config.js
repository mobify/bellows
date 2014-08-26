require.config({
    baseUrl: '../',
    almond: true,
    paths: {
        'text': 'bower_components/requirejs-text/text',
        '$': 'lib/zeptojs/dist/zepto',
        'velocity': 'bower_components/velocity/velocity',
        'bellows': 'dist/bellows',
        'setup-bellows': 'examples/assets/js/setup-bellows'
    },
    'shim': {
        '$': {
            exports: '$'
        }
    }
});
