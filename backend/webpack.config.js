const common = {
    module: {
        loaders: [ /* common loaders */ ]
    },
    plugins: [ /* common plugins */ ],
    resolve: {
        extensions: ['.js', '.jsx'] // common extensions
    }
    // other plugins, postcss config etc. common for frontend and backend
};

const backend = {
     entry: [
         './app.js'
     ],
     output: {
        filename: 'build/index.js'
     },
     target: 'node',
     externals: []
};

module.exports = Object.assign({}, common, backend);