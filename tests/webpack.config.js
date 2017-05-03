module.exports = {
    entry: {
        frontend: './frontend/index.js',
        backend: './backend/index.js'
    },
    output: {
        filename: 'build/[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx'] // common extensions
    },
    target: 'node'
};