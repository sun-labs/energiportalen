var webpack = require('webpack');

module.exports = function() {

    delete process.env.CHAIHTTP_COV;
    var sector = (process && process.env && process.env.TEST_ID) ?
                process.env.TEST_ID.toUpperCase() :
                '';
    var testId;

    switch(sector) {
        case 'BE': //backend tests
            testId = 'backend';
        break;
        case 'FE': //frontend tests
            testId = 'frontend';
        break;
        case 'IN': //integration tests
            testId = 'integration';
        break;
        default:
            throw new Error("TEST_ID is not specified, please use the export function. Ex: export TEST_ID=be to compile backend tests.");
    }

    var config = {
        entry: {},
        output: {},
        plugins: [
            new webpack.DefinePlugin({ "global.GENTLY": false }), // fixes annoying error "require is not a function"
            new webpack.IgnorePlugin(/lib-cov\/http/) // removes the error that this file doesn't exist (as webpack compiles it but chai-http doesnt contin coverage files)
        ],
        
        devtool: 'source-map',
        resolve: {
            extensions: ['.js', '.jsx'] // common extensions
        },
        target: 'node'
    };

    config.entry[testId] = './' + testId + '/index.js';
    config.output.filename = 'build/' + testId + '.js'

    return config;

}