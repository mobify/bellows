module.exports = function(grunt) {
    var lint = require('../jslinting');

    return {
        prod: {
            src: lint.targets,
            options: {
                reset: true,
                config: require.resolve('mobify-code-style/javascript/.eslintrc-prod')
            }
        },
        dev: {
            src: lint.targets,
            options: {
                reset: true,
                config: require.resolve('mobify-code-style/javascript/.eslintrc')
            }
        }
    };
};
