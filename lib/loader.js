"use strict";

// Module to post .xar packages to an eXist database
// Written by Jonathan January 2016
// Modified by Jonathan on 27 January 2017

var
   async  = require('async'),
   fs     = require('fs'),
   path   = require('path'),
   request= require('request');


module.exports = function (filePath, options, grunt, done) {

   var host = options.host;
   var port = options.port;
   var loginUser = options.loginUser;
   var loginPassword = options.loginPassword;

   grunt.verbose.writeln('loginUser',loginUser,'loginPassword',loginPassword);
   
   var packName = path.basename(filePath);
   // create the formdata to upload
   var formData = {
      'uploadedfiles[]': {
         value: fs.createReadStream(filePath),
         options: {
            filename: packName,
            contentType: 'application/octet-stream'
         }
      }
   };
   grunt.verbose.writeln('formData',formData);

   // now send the file
   request.post(
      {  
         uri: 'http://'+host+':'+port+'/exist/apps/dashboard/modules/install.xql',
         formData: formData,
         auth: {
            user: loginUser,
            pass: loginPassword
         }
      },
      function(err,httpResponse,body) {
         if ((err)||(httpResponse.statusCode!==200)) {
         if(err) {grunt.verbose.writeln('err',err);}
         if(httpResponse) {grunt.verbose.writeln('http status code',httpResponse.statusCode);}
         if(body) {grunt.verbose.writeln('body',body);}
            grunt.fail.fatal('Error on uploading',packName);
         } else {
            var contentType = httpResponse.headers['content-type'];
            if(contentType.indexOf(';')!==-1) {
               contentType=contentType.substr(0,contentType.indexOf(';'));
            }
            if(contentType!=='application/json') {
               grunt.fail.fatal('unexpected content-type returned',contentType);
            }
				grunt.verbose.writeln('reply:',body);
            var reply = JSON.parse(body);
            if(reply[0]) {
               if(reply[0]['error']) {
                  grunt.fail.fatal(reply[0]['error']+' package not installed');
               } else {
                  grunt.log.writeln('Package: '+reply[0]['file']+' installed');
               }                 
            } else {
               grunt.fail.fatal('JSON.parse fail',body); 
            }
         }
         done();
      }  
   );
};      

   