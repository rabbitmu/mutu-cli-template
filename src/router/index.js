/**
 * vue-router路径映射
 */
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 异步路由组件
const Main = resolve => {
	import('../container/Main').then(module => resolve(module.default))
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
