const path = require('path');
const commonConfig = require('./webpack.common.config');

module.exports = {
    ...commonConfig,
    mode: 'development',
    entry: './examples/index.js',
    output: {
        path: path.resolve(__dirname, 'examples', 'dist'),
        filename: 'index.js',
        libraryTarget: 'umd',
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname,'examples'),
        compress: true,
        port: 9000
    }
}