/**
 * @file 构建工具
 * @author lidechaobaidu.com
 */

// Generated on 2014-07-30 using generator-webapp-rjs 0.4.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        yeoman: {
            app: 'app'
        },
        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/css/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*'
                ]
            }
        },
        connect: {
            options: {
                port: 8000,
                livereload: true,
                hostname: '*',
                base: [
                        ''
                ]
            },
            livereload: {
                options: {
                    open: 'http://localhost:8000/spec/spec.html'
                }
            }
        }
    });


    grunt.registerTask('serve', function (target) {
        var arr = [
            'connect:livereload',
            'watch'

        ];
        grunt.task.run(arr);


    });
};