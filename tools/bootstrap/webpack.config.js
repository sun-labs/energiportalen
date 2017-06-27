var webpack = require('webpack');

module.exports =  {
    entry: './bootstrap.js',
    output: {
      filename: 'build/bootstrap.js'
    },   
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'] // common extensions
    },
    target: 'node'
};