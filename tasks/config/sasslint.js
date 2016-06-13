module.exports = function(grunt) {
    var targets = [
        'src/**/*.scss'
    ];

    return {
        options: {
            configFile: require.resolve('mobify-code-style/css/.sass-lint.yml')
        },
        target: targets
    };
};
