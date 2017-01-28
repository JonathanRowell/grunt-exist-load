/*
 * grunt-exist-load
 * https://github.com/Jonathan Rowell/grunt-exist-load
 *
 * Copyright (c) 2017 Jonathan Rowell
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

   grunt.registerMultiTask('exist_load', 'Plugin to load a package into the eXist database', function() {
      // Merge task-specific and/or target-specific options with these defaults.
      var options = this.options({
         host: 'localhost',
         port: 8080,
         loginUser: 'admin'
      });
		
		var files = grunt.file.expand(this.data);
		var file = files[0];
		grunt.verbose.writeln('files',files,'file',file);
      if (!grunt.file.exists(file)) {
         grunt.fail.fatal('Source file "' + file + '" not found.');
      } else {
         var loader = require('../lib/loader.js');
         var done = this.async();
      
         grunt.log.writeln('installing',file);
      
         loader(file,options,grunt,done);
		}
   });
};
