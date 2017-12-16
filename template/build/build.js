const webpack = require('webpack')
const testConfig = require('./webpack.test.config')
const productionConfig = require('./webpack.release.config')
const ora = require('ora')
const chalk = require('chalk')

const env = process.env.NODE_ENV
const config = env === 'production' ? productionConfig : testConfig

const snipper = ora(`building for ${ chalk.green(env) } compilation`)
snipper.start()

webpack(config, (err, stats) => {
    snipper.stop()

    if(err) throw err
    
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
})
