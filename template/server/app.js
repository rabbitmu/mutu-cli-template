import path from 'path'
import express from 'express'
import apiRoute from './api/apiRoute'
import bodyParser from 'body-parser'
import history from 'connect-history-api-fallback'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config.js'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const app = express()
const compiler = webpack(webpackConfig)

// 获取端口号
const port = 3001

// 静态目录
const staticResourceDir = `../dev_dist`

// 启动webpack热加载
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: {
        colors: true,
        chunks: false
    },
    publicPath: webpackConfig.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// 设置静态目录
app.use('/static', express.static(path.join(__dirname, staticResourceDir)))

// history-api-fallback
app.use(history())

// 打开监听
app.listen(port, err => {
    if (err) return console.log(err)

    console.log(`listen http://localhost:${port}`)
    console.log('press ctrl + c to stop to listen')
})
