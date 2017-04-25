import store from 'store/store';
import { mapState } from 'vuex';
import Example from 'components/Example';
import throttle from 'utils/throttle';

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
			<div style={ style }>
				<Example name={ name } />
			</div>
		);
	}
};
