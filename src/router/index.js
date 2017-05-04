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
	},
	{
		path: '*',
		redirect: '/app'
	}
];

// 创建router实例
const router = new VueRouter({
	routes
});

export default router;
