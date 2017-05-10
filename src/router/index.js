/**
 * vue-router路径映射
 */
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 异步路由组件
const Main = resolve => {
	require.ensure(['../container/Main'], () => {
		resolve(require('../container/Main').default)
	}, 'main')
}

// 定义路由
const routes = [
	{
		path: '/main',
		component: Main
	},
	{
		path: '*',
		redirect: '/main'
	}
]

// 创建router实例
const router = new VueRouter({
	routes
})

export default router
