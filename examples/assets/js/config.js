require.config({
    baseUrl: '../',
    paths: {
        'text': 'bower_components/requirejs-text/text',
        '$': 'lib/zeptojs/dist/zepto.min',
        'zappy': 'bower_components/tappy/tappy',
        'velocity': 'bower_components/velocity/velocity',
        'jquery-velocity': 'bower_components/velocity/jquery.velocity',
        'bellows': 'dist/bellows'
    },
    'shim': {
        '$': {
            exports: '$'
        }
    }
});
