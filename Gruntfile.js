module.exports = function(grunt){

    grunt.initConfig({

        //Basic settings and info about our plugins
        pkg: grunt.file.readJSON('package.json'),

        //Names of the plugin
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/js/jquery-3.3.1.min.js','src/js/script.js'],
                dest: 'src/js/concat-js/concat.js',
            },
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/all.js': ['src/js/concat-js/concat.js']
                }
            }
        },
        autoprefixer: {
            dist: {
                files:{
                    'src/css/style.css': 'src/css/style.css'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'dist/css/all.css': ['src/css/style.css']
                }
            }
        }
    });

    //load the plugins
    grunt.loadNpmTasks('grunt-autoprefixer')
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //run the tasks
    grunt.registerTask('default',['autoprefixer','cssmin', 'concat', 'uglify']);
}