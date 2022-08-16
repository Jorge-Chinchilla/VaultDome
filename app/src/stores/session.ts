import { defineStore } from "pinia";

export interface Session {
	accessToken: string | null;
	userId: string | null;
}

export const useSessionStore = defineStore("session", {
	state: (): Session => ({
		accessToken: null,
		userId: null,
	}),
	getters: {
		token: (state) => state.accessToken,
		userId: (state) => state.userId,
	},
	actions: {
		login: function (accessToken: string, userId: string) {
			this.accessToken = accessToken;
			this.userId = userId;
		},
		logout: function () {
			this.accessToken = null;
		},
	},
});
