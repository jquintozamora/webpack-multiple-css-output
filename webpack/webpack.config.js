///////////////////////////////////////////////////////////////////////////////////////////////////
//  WebPack 2 Config
///////////////////////////////////////////////////////////////////////////////////////////////////
//  author: Jose Quinto - https://blog.josequinto.com
///////////////////////////////////////////////////////////////////////////////////////////////////

const resolve = require('path').resolve;
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Create multiple instances
const extractStyle = new ExtractTextPlugin('style.css');
const extractLib = new ExtractTextPlugin('lib.css');

module.exports = {
    devtool: 'source-map',
    target: 'web',
    entry: {
        'bundle': './app/src/index.js'
    },
    context: resolve(__dirname, '../'),
    output: {
        path: resolve(__dirname, './../dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".js"]
    },
    module: {
        // loaders -> rules in webpack 2
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',                           // User loader instead loader for compatiblity with next WebPack 2
                include: resolve(__dirname, './../app/src')  // Use include instead exclude to improve build performance
            },
            {
                test: /\.scss$/i,
                include: resolve(__dirname, './../app/stylesheets'),  // Use include instead exclude to improve the build performance
                loader: extractLib.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.scss$/i,
                include: resolve(__dirname, './../app/src'),
                use: extractStyle.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            }
        ]
    },
    plugins: [
        extractStyle,
        extractLib
    ],
};
