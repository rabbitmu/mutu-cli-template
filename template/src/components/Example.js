export default {
    name: 'Example',
    props: {
        name: String
    },
    render() {
        const { name } = this

        return (
            <h1>Hello { name }!</h1>
        )
    }
}
