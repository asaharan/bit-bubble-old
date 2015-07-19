module.exports = function(grunt) {
    grunt.initConfig({
        watch:{
            scripts:{
                files:['js/*.js'],
                tasks:['concat:dist']
            },
            css:{
                files:['sass/*.sass','sass/*.scss'],
                tasks:['sass:dist']
            }
        },
        concat: {
            options: {
                banner:"/*!\n * BubbleUp\n * http://github.com/asaharan/bubbleUp\n * @licence MIT\n*/\n",
                separator: ';\n',
                stripBanner:true,
                process: function(src, filepath) {
                    return '/*!\n * ' + filepath + '\n*/\n' + src;
                }
            },
            dist: {
                src: ['js/*.js'],
                dest: 'build/game.js',
            },
        },
        uglify:{
            options: {
                banner:"/*!\n * BubbleUp\n * http://github.com/asaharan/bubbleUp\n * @licence MIT\n*/\n'use strict';\n",
                mangle: false,
                sourceMap:true,
            },
            my_target:{
                files: {
                    'build/game.min.js': ['build/game.js']
                }
            }
        },
        sass:{
            dist: {
                files: {
                    'build/game.css': 'sass/main.sass'
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //require('load-grunt-tasks')(grunt);
    grunt.registerTask('default',['sass','concat','uglify','watch'])
}