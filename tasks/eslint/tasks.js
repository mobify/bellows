
module.exports = function(grunt) {
    grunt.registerTask('lint:dev', ['eslint:dev']);
    grunt.registerTask('lint:prod', ['eslint:prod']);
    grunt.registerTask('lint', ['lint:dev']);
};
