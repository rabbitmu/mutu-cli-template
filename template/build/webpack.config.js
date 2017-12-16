/**
  * development env
  */

const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const COMPILE_PATH = path.join(__dirname, './dist/')

const baseConfig = require('./webpack.base.config')
const config = merge(baseConfig, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: [ 'vendor.js' ]
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            devtool: 'eval-source-map'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ],
    entry: {
        vendor: [
            './src/lib/setRem.js',
            'vue/dist/vue.runtime.esm.js',
            'vue-router',
            'vuex'
        ],
        main: [
            'webpack-hot-middleware/client?reload=true&noInfo=true',
            './src/main.js'
        ]
    },
    output: {
        path: COMPILE_PATH,
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    }
})

module.exports = config
