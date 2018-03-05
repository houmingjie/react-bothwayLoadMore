const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const extractSass = new ExtractTextPlugin({
    filename: "index.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    target: 'web',
    mode: 'development',
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
                    loader: 'babel-loader',
                    options: {
                        'presets': [
                            ['es2015', {
                                'modules': false
                            }], 'stage-0', 'react'
                        ],
                        'env': {},
                        'ignore': [
                            'node_modules/**',
                            'dist'
                        ],
                        // 'plugins': [
                        //     'transform-decorators-legacy'
                        // ]
                    }
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
    ]
}