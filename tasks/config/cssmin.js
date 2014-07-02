module.exports = function(grunt) {
    return {
        core: {
            src: 'dist/bellows.css',
            dest: 'dist/bellows.min.css'
        },
        style: {
            src: 'dist/bellows-theme.css',
            dest: 'dist/bellows-theme.min.css'
        }
    };
};