const path = require('path');
const commonConfig = require('../webpack.config');

const config = Object.create(commonConfig);

config.entry = './index.js';
config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
};

config.devServer = {
        contentBase: path.join(__dirname),
        compress: true,
        port: 9000
};

module.exports = config;