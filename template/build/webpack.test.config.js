/**
  * test env
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
                NODE_ENV: '"test"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    entry: {
        vendor: [
            './src/lib/setRem.js',
            'vue/dist/vue.runtime.esm.js',
            'vue-router',
            'vuex'
        ],
        main: './src/main.js'
    },
    output: {
        path: DIST_PATH,
        filename: 'scripts/[name].dev.bundle.js',
        chunkFilename: 'scripts/[name].dev.chunk.js'
    }
})

module.exports = config
  