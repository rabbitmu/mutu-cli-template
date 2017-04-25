/**
 * 可滚动的容器，max-height=100%
 */
export default {
	name: 'Scroller',
	render() {
		const style = {
			overflowY: 'scroll',
			maxHeight: '100%'
		};
		return (
			<div
				style={ style }
				class="scroller">{ this.$slots.default }</div>
		);
	}
};
