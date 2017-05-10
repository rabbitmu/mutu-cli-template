import store from 'store';
import { mapState } from 'vuex';
import { Scroller, Example } from 'components';

export default {
	name: 'Main',
	store,
	computed: mapState({
		name: state => state.name
	}),
	render() {
		const { name } = this;
		const style = {
			overflowY: 'scroll',
			maxHeight: '100%',
			textAlign: 'center',
			fontSize: '46px'
		};

		return (
			<Scroller>
				<Example name={ name } />
			</Scroller>
		);
	}
};
