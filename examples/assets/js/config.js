require.config({
    baseUrl: '../',
    almond: true,
    paths: {
        'text': 'node_modules/text/text',
        '$': 'node_modules/jquery/dist/jquery',
        'velocity': 'node_modules/velocity-animate/velocity',
        'plugin': 'node_modules/plugin/dist/plugin.min',
        'bellows': 'dist/bellows',
        'setup-bellows': 'examples/assets/js/setup-bellows'
    },
    'shim': {
        '$': {
            exports: '$'
        }
    }
});
