module.exports = function(grunt) {
    var addRequireJSGlob = function(connect, options, middlewares) {
        middlewares.unshift(require('requirejs-glob')());
        return middlewares;
    };

    return {
        server: {
            options: {
                hostname: '0.0.0.0',
                port: 3000,
                base: '.'
            }
        },
        test: {
            options: {
                hostname: '0.0.0.0',
                port: 8888,
                base: '.',
                middleware: addRequireJSGlob
            }
        }
    };
};