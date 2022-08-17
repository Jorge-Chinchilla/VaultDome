import { defineStore } from "pinia";

export interface Session {
	accessToken: string;
	userId: string;
	isAdmin: boolean;
	subscription: Date | null;
}

export const useSessionStore = defineStore("session", {
	state: (): Session => ({
		accessToken: "",
		userId: "",
		isAdmin: false,
		subscription: null,
	}),
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
	actions: {
		setLogin: function (accessToken: string, userId: string, isAdmin: boolean, subscription: string) {
			this.accessToken = accessToken;
			this.userId = userId;
			this.isAdmin = isAdmin;
			this.subscription = new Date(subscription);
		},
		setLogout: function () {
			this.accessToken = "";
			this.userId = "";
			this.isAdmin = false;
			this.subscription = null;
		},
	},
});
