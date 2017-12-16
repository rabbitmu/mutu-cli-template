const path = require('path')

const cssImageRef = '~resources/sprite.png'
const remScale = 100 
const retinaScale = 1.5

const template = function(data) {
    function formatNumber(num) {
        return (num / remScale / retinaScale).toFixed(2)
    }

    const { width, height } = data.spritesheet

    return data.sprites.map(sprite => {
        return `.icon-N { width: Wrem; height: Hrem; background: url(${ cssImageRef }) Xrem Yrem; background-size: ${ formatNumber(width) }rem ${ formatNumber(height) }rem }`
            .replace(/N/g, sprite.name)
            .replace(/W/g, formatNumber(sprite.width))
            .replace(/H/g, formatNumber(sprite.height))
            .replace(/X/g, formatNumber(sprite.offset_x))
            .replace(/Y/g, formatNumber(sprite.offset_y))
    }).join('\n')
}

module.exports = {
    src: {
        cwd: path.resolve(__dirname, '../src/resources/sprite/'),
        glob: '*.png'
    },
    target: {
        image: path.resolve(__dirname, '../src/resources/sprite.png'),
        css: [
            [
                path.resolve(__dirname, '../src/style/_sprite.scss'),
                {
                    format: 'function_based_template'
                }
            ]
        ]
    },
    spritesmithOptions: {
        padding: 10
    },
    apiOptions: {
        cssImageRef
    },
    customTemplates: {
        'function_based_template': template
    }
}
