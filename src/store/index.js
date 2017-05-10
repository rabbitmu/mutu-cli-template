import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		name: 'Mutu'
	}
})

export default store
