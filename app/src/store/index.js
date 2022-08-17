import { createStore } from "vuex";

export default createStore({
	state: {
		accessToken: "",
		userId: "",
		isAdmin: false,
		subscription: new Date(),
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
		},
	},
	actions: {},
	modules: {},
});
