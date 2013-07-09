'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};


module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    connect: {
      options: {
          port: 9000,
          // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')];
          }
        }
      }
    },
    sass: {
      dist: {
        files: {
          "css/import.css": "sass/*.scss"
        }
      }
    },
    // Configuration to be run (and then tested)
    regarde: {
      fred: {
        files: ['**/*.html', 'sass/*.scss'],
        tasks: ['sass', 'livereload']
      }
    },
    // browser open
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>/html/'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');

  grunt.registerTask('start', ['livereload-start', 'connect', 'open', 'regarde']);
};