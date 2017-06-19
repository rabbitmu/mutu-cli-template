/**
  * production env
  */

const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

const baseConfig = require('./webpack.base.config')

const DIST_PATH = path.join(__dirname, '../dist/')

const config = merge(baseConfig, {
    plugins: [
        new CleanWebpackPlugin([DIST_PATH], {
            root: path.join(__dirname, '../')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    entry: {
        main: './src/main.js',
        vendor: [
            'vue/dist/vue.runtime.esm.js',
            'vue-router',
            'vuex'
        ]
    },
    output: {
        path: DIST_PATH,
        filename: '[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js'
    }
})

module.exports = config
