const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const SpritesmithPlugin = require('webpack-spritesmith')

// 路径
const ROOT_PATH = path.join(__dirname, './')

// 插件列表
const plugins = [
    // 创建vue module缺省值
    new webpack.ProvidePlugin({
        'Vue': [ 'vue/dist/vue.runtime.esm.js', 'default' ]
    }),
    // happypack打包
    new HappyPack({
        verbose: false,
        threads: 4,
        loaders: ['babel-loader']
    }),
    // code-spliting
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    // 分离CSS文件
    new ExtractTextPlugin({
        // 区分环境
        filename: 'style/[name].bundle.css',
        disable: process.env.NODE_ENV === 'development',
        allChunks: true
    }),
    // sprites
    // new SpritesmithPlugin(require('./sprite.config.js')),
    // 生成html文件
    new HtmlWebpackPlugin({
        inject: true,
        filename: 'index.html',
        template: 'template/index.html'
    }),
    // compress image
    new ImageminPlugin({
        disable: process.env.NODE_ENV === 'development',
        text: /\.png$/,
        pngquant: {
            floyd: 1
        }
    }),
    new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
            messages: ['Your application is compiled']
        }
    })
]

module.exports = {
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'resources': path.join(ROOT_PATH, '../src/', 'resources'),
            'constants': path.join(ROOT_PATH, '../', 'constants'),
            'components': path.join(ROOT_PATH, '../src/', 'components')
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                options: {
                    cache: true,
                    failOnError: true,
                    fix: true,
                    quiet: true
                }
            },
            {
                // use babel-loader for *.js files
                // use happypack for improve compile performance
                test: /\.js$/,
                // loader: 'babel-loader',
                loader: 'happypack/loader',
                // important: exclude files in node_modules
                // otherwise it's going to be really slow!
                exclude: /node_modules/
            },
            {
                test: /\.vue$/i,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract(require('./extractTextPlugin.config.js')('vue-style-loader'))
                    }
                }
            },
            {
                // use sass-loader for *.scss files
                test: /\.scss$/i,
                use: ExtractTextPlugin.extract(require('./extractTextPlugin.config.js')('style-loader'))
            },
            {
                // load image file
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]',
                    hash: 'sha512',
                    digest: 'hex',
                    limit: '10000',
                    publicPath: '../'
                }
            },
            {
                // load font files
                test: /\.(woff|ttf|svg|eot)$/i,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]',
                    limit: '10000',
                    publicPath: '../'
                }
            }
        ]
    },
    plugins: plugins,
    // 编译输出信息
    stats: {
        colors: true,
        hash: false,
        chunks: false,
        chunkModules: false,
        children: false,
        modules: false
    },
}

