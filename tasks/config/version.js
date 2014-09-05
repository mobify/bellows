module.exports = function(grunt) {
    return {
        dist: {
            options: {
                prefix: 'VERSION\\s*=\\s*[\\\'|"]'
            },
            src: ['dist/bellows.js', 'dist/bellows.min.js']
        }
    }
};