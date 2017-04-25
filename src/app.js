import 'style/app.scss';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import router from 'router/router';
import App from 'container/App';

// 挂载根实例
const mounter = new Vue({
	router,
	render(h) {
		return (
			<router-view />
		)
	}
}).$mount('#mount');
