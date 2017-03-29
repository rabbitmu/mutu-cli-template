export default {
	name: 'Example',
	props: {
		name: String
	},
	render(h) { // eslint-disable-line no-unused-vars
		const { name } = this;

		return (
			<div>Hello { name }</div>
		);
	}
};
