const path = require('path');
const commonConfig = require('./webpack.common.config');

module.exports = {
    ...commonConfig,
    entry: './examples/index.js',
    output: {
        path: path.resolve(__dirname, 'examples', 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
    },
    devServer: {
        contentBase: path.join(__dirname,'examples'),
        compress: true,
        port: 9001
    }
}