/**
  * production env
  */

const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./webpack.base.config');

const DIST_PATH = path.join(__dirname, '../dist/');
const CLEAN_PATH = path.join(__dirname, './dist/');

const config = merge(baseConfig, {
	plugins: [
		new CleanWebpackPlugin([CLEAN_PATH]),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	],
	debug: false,
	devtool: false,
	entry: {
		app: './src/app.js',
		vendor: [
			'vue',
			'vue-router',
			'vuex'
		]
	},
	output: {
		path: DIST_PATH,
		filename: '[name].bundle.js',
		chunkFilename: '[name].lazy.js'
	}
});

module.exports = config;
