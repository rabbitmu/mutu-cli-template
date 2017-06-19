import path from 'path'
import express from 'express'
import apiRoute from './api/apiRoute'
import bodyParser from 'body-parser'
import history from 'connect-history-api-fallback'

const app = express()

// 获取端口号或者默认为5900
// const port = process.argv.length > 2? parseInt(process.argv[2]): 5900
const port = 3001
// 当前启动环境
const __DEV__ = process.env.NODE_ENV == 'development'

// 静态目录
const staticResourceDir = `../dev_dist`

if (__DEV__) {
    // 启动webpack热加载
    const webpack = require('webpack')
    const config = require('../build/webpack.config')
    const compiler = webpack(config)

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }))

    app.use(require('webpack-hot-middleware')(compiler))
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 设置静态目录
app.use('/static', express.static(path.join(__dirname, staticResourceDir)))

// 控制api路由根路径
app.use('/api', apiRoute)

// 主路由
// app.use('/app', (req, res, next) => {
// 	res.sendFile(path.join(__dirname, staticResourceDir, 'app.html'))
// })

// // 重定向到`/app`
// app.use('/', (req, res) => {
// 	res.status(302).redirect('/app')
// })

// history-api-fallback
app.use(history())

// 打开监听
app.listen(port, (err) => {
    if (err) return console.log(err)

    console.log(`listen http://localhost:${port}`)
    console.log('press ctrl + c to stop to listen')
})
