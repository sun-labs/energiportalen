module.exports = {
     entry: [
         './app.js'
     ],
     output: {
        filename: 'build/index.js'
     },
     resolve: {
        extensions: ['.js', '.jsx'] // common extensions
     },
     target: 'node',
};