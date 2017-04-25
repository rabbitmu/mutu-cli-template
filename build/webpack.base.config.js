const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

// 路径
const ROOT_PATH = path.join(__dirname, '../');
const TEMPLATE_PATH = path.join(__dirname, '../', 'template');

// 插件列表
const plugins = [
	// 创建全局变量
	new webpack.ProvidePlugin({
		'Vue': 'vue'
	}),
	// 共享代码
	new webpack.optimize.CommonsChunkPlugin({
		name: 'common',
		minChunks: 2
	}),
	// 分离CSS文件
	new ExtractTextPlugin('[name].style.css', {
		disable: false,
		allChunks: true
	}),
	// 生成html文件
	new HtmlWebpackPlugin({
		inject: true,
		hash: true,
		minify: {
			removeComments: false,
			collapseWhitespace: false
		},
		filename: 'app.html',
		template: TEMPLATE_PATH + '/app.html',
		chunks: ['common', 'app', 'vue']
	})
];

module.exports = {
	module: {
		loaders: [
			{
				// use vue-loader for *.vue files
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				// use babel-loader for *.js files
				test: /\.js$/,
				loader: 'babel',
				// important: exclude files in node_modules
				// otherwise it's going to be really slow!
				exclude: /node_modules/
			},
			{
				// use sass-loader for *.scss files
				test: /\.scss/i,
				loader: ExtractTextPlugin.extract('css!sass'),
				exclude: /node_modules/
			},
			{
				// load json file
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				// load image file
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file?hash=sha512&digest=hex&limit=10000&name=[hash].[ext]'
				]
			},
			{
				// font file
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&minetype=application/font-woff'
			}, {
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&minetype=application/font-woff'
			}, {
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&minetype=application/octet-stream'
			}, {
				test: /\.ijmap(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&minetype=application/font-woff'
			}, {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file'
			}, {
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&minetype=image/svg+xml'
			}
		]
	},
	vue: {
		// configure autoprefixer
		autoprefixer: {
			browsers: ['last 5 versions']
		},
		loaders: {
			// css
			css: ExtractTextPlugin.extract("css-loader"),
			// sass
			sass: ExtractTextPlugin.extract("css-loader!sass-loader")
		}
	},
	resolve: {
		extensions: ['', '.js'],
		alias: {
			'vue$': 'vue/dist/vue.js',
			'constants': path.join(ROOT_PATH, './', 'constants'),
			'router': path.join(ROOT_PATH, './src/', 'router'),
			'store': path.join(ROOT_PATH, './src/', 'store'),
			'utils': path.join(ROOT_PATH, './src/', 'utils'),
			'style': path.join(ROOT_PATH, './src/', 'style'),
			'components': path.join(ROOT_PATH, './src/', 'components'),
			'container': path.join(ROOT_PATH, './src/', 'container'),
			'resources': path.join(ROOT_PATH, './src/', 'resources'),
			'static': path.join(ROOT_PATH, './src/', 'static'),
			'plugins': path.join(ROOT_PATH, './src/', 'plugins')
		}
	},
	plugins: plugins
};

