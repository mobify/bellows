require.config({
    baseUrl: '../../',
    paths: {
        'text': 'node_modules/text/text',
        'gremlins': 'node_modules/gremlins.js/gremlins.min',
        '$': 'node_modules/jquery/dist/jquery',
        'velocity': 'node_modules/velocity-animate/velocity',
        'bellows': 'dist/bellows'
    },
    'shim': {
        '$': {
            exports: '$'
        }
    }
});
