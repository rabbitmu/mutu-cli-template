import './style/app.scss'
import router from './router'

// 挂载根实例
const mounter = new Vue({
    router,
    render(h) {
        return (
            <router-view />
        )
    }
}).$mount('#mount')
