import store from '../store'
import { mapState } from 'vuex'
import { Scroller, Example } from 'components'

export default {
	name: 'Main',
	store,
	computed: mapState({
		name: state => state.name
	}),
	render() {
		const { name } = this

		return (
			<Scroller>
				<Example name={ name } />
			</Scroller>
		)
	}
}
