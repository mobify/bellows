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
            buildProducts: "build/"
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
                    {expand: true, flatten: true, src: ['src/**'], dest: 'build/', filter: 'isFile'}
                ]
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/bellows.js',
                dest: 'build/bellows.min.js'
            }
        },
        autoprefixer: {
            multiple_files: {
                expand: true,
                flatten: true,
                src: 'src/*.css', // -> src/css/file1.css, src/css/file2.css
                dest: 'src/' // -> dest/css/file1.css, dest/css/file2.css
            }
        },
        cssmin: {
            core: {
                src: 'src/bellows.css',
                dest: 'build/bellows.min.css'
            },
            style: {
                src: 'src/bellows-style.css',
                dest: 'build/bellows-style.min.css'
            }
        },
        shell: {
            tagRelease: {
                command: 'git tag -a <%= releaseName %> -m "<%= releaseMessage %>" &&' +
                  'git push origin <%= releaseName %>'
            }
        },
        zip: {
            "build/bellows.zip": ["src/bellows.js", "src/bellows.css", 
            "src/bellows-style.css"]
        },
        s3: {
            key: '<%= localConfig.aws.key %>',
            secret: '<%= localConfig.aws.secret %>',
            bucket: '<%= localConfig.aws.bucket %>',
            access: "public-read",
            headers: { "Cache-Control": "max-age=1200" },
            upload: [
                { // build
                    src: "build/*",
                    dest: "modules/bellows/<%= pkg.version %>/",
                    rel: "build"
                }
            ]
        }
        // TODO: upload over a LATEST version and/or create a redirect?
    });

    // Load the task plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('build', ['copy', 'uglify', 'cssmin', 'zip']);
    grunt.registerTask('release', ['build', 'shell:tagRelease', 's3']);
    grunt.registerTask('default', 'build');

};
