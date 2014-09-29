require.config({
    baseUrl: '../',
    almond: true,
    paths: {
        'text': 'bower_components/requirejs-text/text',
        '$': 'lib/zeptojs/dist/zepto',
        'velocity': 'bower_components/mobify-velocity/velocity',
        'plugin': 'bower_components/plugin/dist/plugin.min',
        'bellows': 'dist/bellows',
        'setup-bellows': 'examples/assets/js/setup-bellows'
    },
    'shim': {
        '$': {
            exports: '$'
        }
    }
});
