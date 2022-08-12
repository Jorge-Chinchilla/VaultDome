import { defineStore } from "pinia";

export interface Item {
	accessToken: string | null;
}

export const useSessionStore = defineStore({
	id: "session",
	state: (): Item => ({
		accessToken: null,
	}),
	getters: {
		token: (state) => state.accessToken,
	},
	actions: {
		login(accessToken: string) {
			this.accessToken = accessToken;
		},
		logout() {
			this.accessToken = null;
		},
	},
});
