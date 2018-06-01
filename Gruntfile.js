module.exports = function(grunt) {

  grunt.initConfig({

    //Basic settings and info about our plugins
    pkg: grunt.file.readJSON('package.json'),

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
                'dist/css/all.css': ['src/css/style.css', 'src/css/vendor/font-awesome.min.css']
            }
        }
    }    
  });

  grunt.loadNpmTasks('grunt-autoprefixer')
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['autoprefixer', 'cssmin']);

};