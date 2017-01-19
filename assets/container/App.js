import store from 'store/store';
import { mapState } from 'vuex';

export default {
    name: 'App',
    store,
    computed: mapState({
        name: state => state.name
    }),
    render(h) {
        const { name } = this;

        return (
            <div style={ { textAlign: 'center', fontSize: '46px' } }>Hello { name }</div>
        );
    }
};
