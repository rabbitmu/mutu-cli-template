/**
  * production env
  */

const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const merge = require('webpack-merge');
const path = require('path');
const os = require('os');

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
		app: './src/app.js'
	},
	output: {
		path: DIST_PATH,
		filename: '[name].bundle.js'
	}
});

module.exports = config;
