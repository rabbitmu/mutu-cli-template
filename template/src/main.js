import './style/app.scss'
import router from './router'

// 挂载根实例
new Vue({
    router,
    render() {
        return (
            <router-view />
        )
    }
}).$mount('#mount')
