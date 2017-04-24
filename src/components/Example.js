import axios from 'utils/request';

export default {
	name: 'Example',
	props: {
		name: String
	},
	render() {
		const { name } = this;

		return (
			<div>Hello { name }</div>
		);
	}
};
