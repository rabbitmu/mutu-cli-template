const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

// 路径
const ROOT_PATH = path.join(__dirname, './');
const TEMPLATE_PATH = path.join(__dirname, './', 'template');

// 无需编译文件存放目录
const STATIC_PATH = path.join(__dirname, './', 'project/static');

// 插件列表
const plugins = [
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
        chunks: ['common', 'app']
    })
];

module.exports = {
    entry: {
        app: './assets/app.js',
        // vendor: ['babel-polyfill']
    },
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
            'router': path.join(ROOT_PATH, './assets/', 'router'),
            'store': path.join(ROOT_PATH, './assets/', 'store'),
            'utils': path.join(ROOT_PATH, './assets/', 'utils'),
            'style': path.join(ROOT_PATH, './assets/', 'style'),
            'components': path.join(ROOT_PATH, './assets/', 'components'),
            'container': path.join(ROOT_PATH, './assets/', 'container'),
            'resources': path.join(ROOT_PATH, './assets/', 'resources')
        }
    },
    plugins: plugins
};
