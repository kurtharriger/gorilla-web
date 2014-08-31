
var webpack = require('webpack');
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-bower-install-simple");

  grunt.registerTask('default', ['bower-install-simple:install', 'copy:dist', 'webpack:dist']);
  grunt.initConfig({

    "bower-install-simple": {
      options: {
        color: true,
        production: true,
        directory: "./app/bower_components"
      },
      install: {}
    },

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
          modulesDirectories: [ "node_modules", "web_modules", "bower_components"],
          extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
        },

        plugins: [
          new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
          ),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
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
    },

    "webpack-dev-server": {
      start: {
        keepalive: true,
        hot: true,
        contentBase: 'app/',
        port: 8991,
        webpack: {
          context: __dirname + '/app/',
          entry: {
            'worksheet.js': ["webpack-dev-server/client?http://localhost:8991", 'webpack/hot/dev-server', './js/entry-worksheet.js'],
            'viewer.js': ["webpack-dev-server/client?http://localhost:8991", 'webpack/hot/dev-server','./js/entry-viewer.js']
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
            modulesDirectories: [ "node_modules", "web_modules", "bower_components"],
            extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
          },

          plugins: [
            new webpack.ResolverPlugin(
              new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
            ),
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