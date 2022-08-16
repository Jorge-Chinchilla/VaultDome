import { defineStore } from "pinia";

export interface Session {
	accessToken: string | null;
}

export const useSessionStore = defineStore("session", {
	state: (): Session => ({
		accessToken: null,
	}),
	getters: {
		token: (state) => state.accessToken,
	},
	actions: {
		saveToken: function (accessToken: string) {
			this.accessToken = accessToken;
		},
		dropToken: function () {
			this.accessToken = null;
		},
	},
});
