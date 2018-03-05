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
        libraryTarget: 'umd',
    },
    target: 'web',
    devtool: "source-map",
    stats: { //object
        assets: true,
        colors: true,
        errors: true,
        errorDetails: true,
        hash: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf|woff2)$/i,
                use: 'url-loader'
            },
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
    externals:{
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    }
}