var webpack = require('webpack');
module.exports = {
    entry: {
        frontend: './frontend/index.js',
        integration: './integration/index.js',
        backend: './backend/index.js'
    },
    output: {
        filename: 'build/[name].js'
    },
    plugins: [
     new webpack.DefinePlugin({ "global.GENTLY": false }) // fixes annoying error "require is not a function"
    ],
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'] // common extensions
    },
    target: 'node'
};