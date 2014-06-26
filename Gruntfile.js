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
        clean: ["dist/"],
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
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/**', '!*.scss'],
                        dest: 'dist/',
                        filter: 'isFile'
                    }
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
              browsers: ['last 4 versions', 'ie 8', 'ie 9', 'Android 2.3']
            },
            multiple_files: {
                flatten: true,
                src: 'dist/*.css'
            }
        },
        cssmin: {
            core: {
                src: 'dist/bellows.css',
                dest: 'dist/bellows.min.css'
            },
            style: {
                src: 'dist/bellows-theme.css',
                dest: 'dist/bellows-theme.min.css'
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'nested'
                },
                files: [{
                    expand: true,
                    cwd: 'src/style',
                    src: ['*.scss'],
                    dest: 'dist',
                    ext: '.css'
                }]
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('build', ['clean', 'copy', 'uglify', 'sass', 'autoprefixer', 'cssmin']);
    grunt.registerTask('release', ['build', 'shell:tagRelease']);
    grunt.registerTask('default', 'build');

};
