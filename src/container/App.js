import store from 'store/store';
import { mapState } from 'vuex';
import Scroller from 'components/Scroller';
import Example from 'components/Example';

export default {
	name: 'App',
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
