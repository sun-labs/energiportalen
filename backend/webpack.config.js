module.exports = {
     entry: [
         './app.js'
     ],
     output: {
        filename: 'build/index.js'
     },
     devtool: 'source-map',
     resolve: {
        extensions: ['.js', '.jsx'] // common extensions
     },
     target: 'node',
};