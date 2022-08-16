import { createApp } from "vue";
import { createPinia } from "pinia";
import persistedstate from "pinia-persistedstate";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
const store = createPinia();

store.use(
	persistedstate({
		key: "client",
	})
);

app.use(store);
app.use(router);

app.mount("#app");
