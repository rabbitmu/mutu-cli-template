import store from 'store/store';
import { mapState } from 'vuex';
import Example from 'components/Example';

export default {
    name: 'App',
    store,
    computed: mapState({
        name: state => state.name
    }),
    render(h) { // eslint-disable-line no-unused-vars
        const { name } = this;

        return (
            <div style={ { textAlign: 'center', fontSize: '46px' } }>
                <Example name={ name } />
            </div>
        );
    }
};
