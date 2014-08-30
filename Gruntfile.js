
var webpack = require('webpack');
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy:dist', 'webpack:dist']);
  grunt.initConfig({

    copy: {
      dist: {
        cwd: 'app/',
        expand: true,
        src: '**',
        dest: 'dist/'
      }
    },
    webpack: {
      dist: {
        context: __dirname + '/app/',
        entry: {
          'worksheet.js': './js/entry-worksheet.js',
          'viewer.js': './js/entry-viewer.js'
        },
        output: {
          path: 'dist/',
          filename: '_js/[name]'
        },
        cache: true,

        resolve: {
          modulesDirectories: [ "node_modules", "web_modules"],
          extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
        },

        module: {
          loaders: [
            {
              test: /\.html$/,
              loader: 'raw-loader'
            },
            {
              test: /\.jsx$/,
              loader: 'react-hot!jsx-loader?insertPragma=React.DOM'
            },
            {
              test: /\.scss$/,
              loader: 'style!css!sass'
            },
            {
              test: /\.css$/,
              loader: 'style!css'
            }
          ]
        }
      }
    },

    "webpack-dev-server": {
      start: {
        keepalive: true,
        hot: true,
        inline: true,
        contentBase: 'app/',
        port: 8991,
        webpack: {
          context: __dirname + '/app/',
          entry: {
            'worksheet.js': './js/entry-worksheet.js',
            'viewer.js': './js/entry-viewer.js'
          },
          output: {
            path: 'app/',
            filename: '_js/[name]'
          },

          cache: true,
          debug: true,
          devtool: "#source-map",

          stats: {
            colors: true,
            reasons: true
          },

          resolve: {
            modulesDirectories: [ "node_modules", "web_modules"],
            extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
          },

          plugins: [
            new webpack.HotModuleReplacementPlugin()
          ],

          module: {
            loaders: [
              {
                test: /\.html$/,
                loader: 'raw-loader'
              },
              {
                test: /\.jsx$/,
                loader: 'react-hot!jsx-loader?insertPragma=React.DOM'
              },
              {
                test: /\.scss$/,
                loader: 'style!css!sass'
              },
              {
                test: /\.css$/,
                loader: 'style!css'
              }
            ]
          }
        }
      }
    }
  });
};