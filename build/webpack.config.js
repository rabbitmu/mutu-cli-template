/**
  * development env
  */

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const baseConfig = require('./webpack.base.config');

const COMPILE_PATH = path.join(__dirname, '../dev_dist/');

const config = merge(baseConfig, {
	entry: {
		app: [
			'webpack-hot-middleware/client',
			'./src/app.js'
		],
		vendor: [
			'vue',
			'vue-router',
			'vuex'
		]
	},
	plugins: [
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
	devtool: 'eval-source-map',
	output: {
		path: COMPILE_PATH,
		filename: '[name].bundle.js',
		publicPath: '/',
		chunkFilename: '[name].chunk.js'
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
	}
});

module.exports = config;
