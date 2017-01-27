/*
 * grunt-exist-load
 * https://github.com/Jonathan Rowell/grunt-exist-load
 *
 * Copyright (c) 2017 Jonathan Rowell
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

   // Project configuration.
   grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

   jsvalidate: {
      options: {
         globals: {},
         esprimaOptions: {},
         verbose: false
      },
      targetName:{
         files:{
            src:['<%=jshint.all%>']
         }
      }
   },
   
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
   exist_load: {
      options: {
         loginUser: 'admin',
         loginPassword: 'bibdia',
         host: 'localhost',
         port: 8080
      },
      file: 'test/fixtures/*.xar'
   },

    // Unit tests.
   nodeunit: {
      tests: ['test/*_test.js']
   }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsvalidate');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'exist_load']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'jsvalidate', 'test']);

};
