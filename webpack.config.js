const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

let config = {
    entry: {
        bundle: path.resolve(__dirname, 'app/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'web'),
        filename: '[name].js'
    },
    module: {
        loaders:[{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(scss|less|css)$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
        }, {
            test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    postcss: () => ([require('postcss-cssnext')]),
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            favicon: 'app/favicon.ico',
            template: path.resolve(__dirname, 'app/index.html')
        }),
        new CopyWebpackPlugin([
            { from: './app/static', to: 'static' }
        ]),
        new ExtractTextPlugin('[name].css')
    ],
    resolve: {
        modulesDirectories: ['app', 'node_modules'],
        extensions: ['', '.js', '.jsx']
    }
};

if (NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin()
    );
}

if (NODE_ENV === 'development') {
    config.plugins.push(
        new OpenBrowserPlugin({
            url: 'http://localhost:8080'
        })
    );
}

module.exports = config;