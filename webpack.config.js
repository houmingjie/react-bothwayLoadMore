const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractSass = new ExtractTextPlugin({
    filename: "index.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    mode:process.env.NODE_ENV || 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['node_modules'],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }
                    ]
                })
            }
        ]
    },
    plugins: [
        extractSass
    ],
    externals:[
        'react',
        'react-dom'
    ]
}