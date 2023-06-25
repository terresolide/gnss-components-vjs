export default {
	namespaced: true,
	state: {
		user: null
	},
	getters: {
		isAdmin (state, getters) {
			if (!state.user || !state.user['client-roles']) {
				return false
			}
			if (state.user['client-roles'].indexOf('GNSS') >= 0) {
				return true
			}
			return false
		},
		email (state, getters) {
			if (!state.user || !state.user.email) {
				return null
			}
			return state.user.email
		}
	},
	mutations: {
		set (state, user) {
			state.user = user
		}
	}
}