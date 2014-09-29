module.exports = function(grunt) {
    return {
        options: {
            banner: '/*! <%= pkg.name %> <%= pkg.version %> (<%= pkg.repository.url%>) */\n'
        },
        build: {
            src: 'src/js/bellows.js',
            dest: 'dist/bellows.min.js'
        }
    };
};