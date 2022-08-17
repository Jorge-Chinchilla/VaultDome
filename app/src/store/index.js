import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

export default createStore({
	plugins: [createPersistedState()],

	state: {
		accessToken: "",
		userId: "",
		isAdmin: false,
		subscription: new Date(),
		following: [],
	},
	getters: {
		getToken: (state) => state.accessToken,
		getUserId: (state) => state.userId,
		getAdmin: (state) => state.isAdmin,
		getSubscription: (state) => state.subscription,
		getSubscriptionStatus: (state) => {
			if (!state.subscription) return false;
			return !(new Date() >= state.subscription);
		},
		getFollowingUsers: (state) => state.following,
	},
	mutations: {
		setLogin: function (state, payload) {
			state.accessToken = payload.accessToken;
			state.userId = payload.userId;
			state.isAdmin = payload.isAdmin;
			state.subscription = new Date(payload.subscription);
		},
		setLogout: function (state) {
			state.accessToken = "";
			state.userId = "";
			state.isAdmin = false;
			state.subscription = new Date();
			state.following = [];
		},
		setFollowingUsers: function (state, payload) {
			const followingIds = payload.following.map(user => user.id);
			state.following = [...new Set(state.following.concat(followingIds))];
		},
		dropFollowingUser: function (state, payload) {
			const index = state.following.indexOf(payload.id);
			if (index !== -1) {
				let following = state.following;
				following.splice(index, 1);
				state.following = following;
			}
		},
	},
	actions: {},
	modules: {},
});
