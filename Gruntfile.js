module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
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
        clean: {
            buildProducts: "dist/"
        },
        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 3000,
                    base: '.'
                }
            }
        },
        watch: {
            files: ["src/**/*"],
            tasks: ['build']
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['src/**'], dest: 'dist/', filter: 'isFile'}
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/bellows.js',
                dest: 'dist/bellows.min.js'
            }
        },
        autoprefixer: {
            options: {
              browsers: ['last 4 version', 'ie 8', 'ie 9', 'Android 2']
            },
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'src/style/*.css',
                dest: 'dist/'
            }
        },
        cssmin: {
            core: {
                src: 'dist/bellows.css',
                dest: 'dist/bellows.min.css'
            },
            style: {
                src: 'dist/bellows-style.css',
                dest: 'dist/bellows-style.min.css'
            }
        },
        shell: {
            tagRelease: {
                command: 'git tag -a <%= releaseName %> -m "<%= releaseMessage %>" &&' +
                  'git push origin <%= releaseName %>'
            }
        }
    });

    // Load the task plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Default task(s).
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('build', ['copy', 'uglify', 'autoprefixer', 'cssmin']);
    grunt.registerTask('release', ['build', 'shell:tagRelease']);
    grunt.registerTask('default', 'build');

};
