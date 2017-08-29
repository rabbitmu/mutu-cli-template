import component from './component'

const Constructor = Vue.extend(component)

function getInstance() {
    return new Constructor({
        el: document.createElement('div')
    })
}

Constructor.prototype.close = function() {
    document.body.removeChild(this.$el)
}

// 保存页面中已经存在的组件，同一时间只能存在一个
let instanceTemp

function Loading() {
    let instance
    if(document.querySelector('[loading-component]')) {
        instance = instanceTemp
    } else {
        instance = getInstance()
        instanceTemp = instance
        document.body.appendChild(instance.$el)
    }

    return instance
}

export default {
    install(Vue) {
        Vue.loading = Loading
        Vue.prototype.$loading = Loading
    }
}
