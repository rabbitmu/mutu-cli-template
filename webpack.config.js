/**
  * development env
  */

const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const baseConfig = require('./webpack.base.config')

const COMPILE_PATH = path.join(__dirname, './dev_dist/')

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
		app: [
			'webpack-hot-middleware/client',
			'./src/app.js'
		],
		vendor: [
			'vue/dist/vue.runtime.esm.js',
			'vue-router',
			'vuex'
		]
	},
	output: {
		path: COMPILE_PATH,
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js'
	}
})

module.exports = config
