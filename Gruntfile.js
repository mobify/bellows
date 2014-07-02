'use strict'

var path = require('path');

module.exports = function(grunt) {
    var _ = grunt.util._;

    // By default, we load all local tasks from the tasks directory.
    grunt.file.expand('tasks/*').forEach(function(task) {
        grunt.loadTasks(task);
    });

    var configPaths = [
        'node_modules/adaptivejs/tasks/config/*',
        'tasks/config/*'
    ];

    // Populate the config object
    var config = {};
    grunt.file.expand(configPaths).forEach(function(configPath) {
        // Get the grunt-task name to put in the config which is based on the
        // name of the config file
        var configName = configPath.match(/\/([^\/]*)\.js/)[1];
        var option = require(path.join(__dirname + '/' + configPath))(grunt);
        config[configName] = _.extend(config[configName] || {}, option);
    });

    grunt.initConfig(_.extend({
        pkg: grunt.file.readJSON('package.json'),
        localConfig: (function(){
            try {
                return grunt.file.readJSON('localConfig.json')
            } catch(e) {
                return {};
            }
        })(),
        releaseName: '<%= pkg.name %>-<%= pkg.version %>',
        releaseMessage: '<%= pkg.name %> release <%= pkg.version %>',
    }, config));

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('build', ['copy', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('release', ['build', 'shell:tagRelease']);
    grunt.registerTask('default', 'build');
};
