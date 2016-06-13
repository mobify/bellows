module.exports = function(grunt) {
    return {
        examples: {
            path: 'http://localhost:3000/examples',
            app: 'Google Chrome'
        },
        tests: {
            path: 'http://localhost:8888/tests/runner',
            app: 'Google Chrome'
        }
    };
};
