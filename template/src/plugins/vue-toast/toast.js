/**
 * 创建组件模板
 */
import style from './style.scss'
const ToastConstructor = Vue.extend({
    name: 'Toast',
    data() {
        return {
            /**
             * 控制组件显示/隐藏
             */
            visible: false,
            /**
             * 组件显示信息
             */
            message: ''
        }
    },
    render() {
        const { message, visible } = this

        return (
            <div
                class={ style.toast }
                style={ { opacity: visible ? 1 : 0 } }>{ message }</div>
        )
    }
})
let canToast = true // 控制toast次数

const getInstance = () => {
    return new ToastConstructor().$mount()
}

const removeDom = event => {
    if(event.target.parentNode) {
        event.target.parentNode.removeChild(event.target)
    }
}

ToastConstructor.prototype.close = function() {
    this.visible = false
    this.$el.addEventListener('transitionend', removeDom)
}

function Toast(options = '') {
    // 控制点击次数
    if(!canToast) return
    canToast = false

    const instance = getInstance()
    instance.message = typeof options === 'string' ? options : options.message

    document.body.appendChild(instance.$el)

    /**
     * 加载时渲染过渡效果
     */
    setTimeout(() => {
        instance.visible = true

        clearTimeout(timer)
        let timer = setTimeout(() => {
            instance.close()
            canToast = true
        }, 2000)
    }, 0)
}

export default {
    install(Vue) {
        Vue.toast = Toast
        Vue.prototype.$toast = Toast
    }
}
