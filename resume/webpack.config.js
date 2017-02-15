/**
  * development env
  */

const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const path = require('path');
const os = require('os');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.config');

const DIST_PATH = path.join(__dirname, './dist/');

const config = merge(baseConfig, {
    entry: {
        app: [
            'webpack-hot-middleware/client',
            './assets/app.js'
        ]
    },
    plugins: [
        // new CleanWebpackPlugin([DIST_PATH]),
        // new DashboardPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ],
    debug: true,
    devtool: 'source-map',
    output: {
        path: DIST_PATH,
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        assets: true,
    },
    progress: true,
    keepalive: true,
    watchOptions: {
        aggregateTimeout: 500, // ms, default is 300
        poll: true
    },
    devServer: {
        historyApiFallback: {
            index: '/app.html'
        }
    }
});

module.exports = config;
