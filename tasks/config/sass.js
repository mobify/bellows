module.exports = function(grunt) {
    var importOnce = require('node-sass-import-once');

    return {
        min: {
            options: {
                outputStyle: 'compressed',
                includePaths: [
                    'src/style/',
                    'node_modules/'
                ],
                importer: importOnce,
                importOnce: {
                    index: false,
                    css: false
                }
            },
            files: [{
                expand: true,
                cwd: 'src/style/',
                src: [
                    '**/*.scss',
                    '!node_modules/**/*.scss'
                ],
                dest: 'dist/',
                ext: '.min.css',
            }]
        },
        unmin: {
            options: {
                outputStyle: 'expanded',
                includePaths: [
                    'src/style/',
                    'node_modules/'
                ],
                importer: importOnce,
                importOnce: {
                    index: false,
                    css: false
                },
                indentWidth: 2
            },
            files: [{
                expand: true,
                cwd: 'src/style/',
                src: [
                    '**/*.scss',
                    '!node_modules/**/*.scss'
                ],
                dest: 'dist/',
                ext: '.css',
            }]
        }
    };
};
