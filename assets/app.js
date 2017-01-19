import 'style/app.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from 'router/router';
import App from 'container/App';

// 创建router实例
const router = new VueRouter({
	mode: 'history',
	routes
});

// 挂载根实例
const mounter = new Vue({
	router,
	render(h) {
		return (
			<router-view />
		)
	}
}).$mount('#mount');
