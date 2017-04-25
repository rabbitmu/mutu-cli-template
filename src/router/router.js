/**
 * vue-router路径映射
 */
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 路由组件
import App from 'container/App';

// 定义路由
const routes = [
	{
		path: '/app',
		component: App
	}
];

// 创建router实例
const router = new VueRouter({
	mode: 'history',
	routes
});

export default router;
