import { defineStore } from "pinia";

export interface Session {
	accessToken: string;
	userId: string;
}

export const useSessionStore = defineStore("session", {
	state: (): Session => ({
		accessToken: "",
		userId: "",
	}),
	getters: {
		getToken: (state) => state.accessToken,
		getUserId: (state) => state.userId,
	},
	actions: {
		setLogin: function (accessToken: string, userId: string) {
			this.accessToken = accessToken;
			this.userId = userId;
		},
		setLogout: function () {
			this.accessToken = "";
		},
	},
});
