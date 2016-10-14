const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

let config = {
    entry: {
        bundle: path.resolve(__dirname, 'app/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
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
            test: /\.(scss|css)$/,
            loader: 'style-loader!css-loader!postcss-loader'
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
            template: path.resolve(__dirname, 'app/index.html')
        }),
         new CopyWebpackPlugin([
            { from: './app/api', to: 'api' },
            { from: './app/resources', to: 'resources' }
	    ])
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