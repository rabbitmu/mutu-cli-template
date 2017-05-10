import '../style/Toast.scss'

export default {
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
				class="toast"
				style={ { opacity: visible ? 1 : 0 } }>{ message }</div>
		)
	}
}
