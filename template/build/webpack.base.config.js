const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const ImageminPlugin = require('imagemin-webpack-plugin').default

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
        threads: 4,
        loaders: ['babel-loader']
    }),
    // code-spliting
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    // 分离CSS文件
    new ExtractTextPlugin({
        filename: '[name].bundle.css',
        disable: process.env.NODE_ENV !== 'production',
        allChunks: true
    }),
    // 生成html文件
    new HtmlWebpackPlugin({
        inject: true,
        hash: true,
        filename: 'index.html',
        template: 'index.html'
    }),
    // compress image
    new ImageminPlugin({
        disable: process.env.NODE_ENV !== 'production',
        text: /\.png$/,
        pngquant: {
            floyd: 1
        }
    })
]

module.exports = {
    resolve: {
        extensions: ['.js'],
        alias: {
            'resources': path.join(ROOT_PATH, '../src/', 'resources'),
            'constants': path.join(ROOT_PATH, '../', 'constants'),
            'components': path.join(ROOT_PATH, '../src/', 'components')
        }
    },
    module: {
        rules: [
            {
                // use babel-loader for *.js files
                // use happypack for improve compile performance
                test: /\.js$/,
                loader: 'happypack/loader',
                // important: exclude files in node_modules
                // otherwise it's going to be really slow!
                exclude: /node_modules/
            },
            {
                // use sass-loader for *.scss files
                test: /\.scss/i,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: process.env.NODE_ENV === 'production',
                                sourceMap: true,
                                modules: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'sass-loader'
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                // load image file
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    hash: 'sha512',
                    digest: 'hex',
                    limit: '10000',
                    name: '[hash].[ext]'
                }
            }
        ]
    },
    plugins: plugins
}

