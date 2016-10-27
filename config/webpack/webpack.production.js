// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = require('./webpack.base')({
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'app/entry.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  environmentConfig: path.join(__dirname, '../environments/client/production.js'),
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      children: true,
      minChunks: 2,
      async: true,
    }),

    // OccurrenceOrderPlugin is needed for long-term caching to work properly.
    // See http://mxs.is/googmv
    new webpack.optimize.OccurrenceOrderPlugin(true),

    // Merge all duplicate modules
    new webpack.optimize.DedupePlugin(),

    // Minify and optimize the JavaScript
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false, // ...but do not show warnings in the console (there is a lot of them)
      },
      compressor: {
        warnings: false
      }
    }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'public', 'template.html'),
      filename: path.resolve(process.cwd(), 'public', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    // Extract the CSS into a seperate file
    new ExtractTextPlugin('[name].[contenthash].css'),
  ],
});
