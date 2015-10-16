module.exports = function(grunt) {
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    
	// Run Sass to compile all of our CSS
	sass: {            
      dist: {
        options: {
          style: 'nested' // compact, compressed, nested or expanded
        },
        files: {
          'assets/screen.css' : 'a/sass/screen.scss'
        }
      }                  
    },
    
    
    // Make sure any custon js is not stupid, then concatonate stuffs
    jshint: {
      beforeuglify: 'a/js/script.js'
    },
    
    uglify: {      
      dist: {        
        files: {
          'assets/script-min.js' : ['a/js/jquery/jquery-2.1.4.js', 'a/js/plugins/*.js', 'a/js/script.js']          
        }        
      }      
    },
    	
	// Watch options: what tasks to run when changes to files are saved
    watch: {
      options: {
        livereload: false
      },
      
		css: {
	        files: ['a/sass/**/*.scss'],
	        tasks: ['sass']
	    },
	      
	    jstest: {
	        files: ['a/js/script.js'],
	        tasks: ['jshint']
	    },
	      
	    jsmin: {
	        files: ['a/js/**/*.js'], // Watch for changes in JS files except for script.min.js to avoid reload loops
	        tasks: ['uglify']
	    }
	}    

  });
 
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('default', ['sass', 'jshint', 'uglify', 'watch']);
  
};
