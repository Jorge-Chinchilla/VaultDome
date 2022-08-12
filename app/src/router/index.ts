import { createRouter, createWebHistory } from "vue-router";
import { useSessionStore } from "@/stores/session";
import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import ProfileView from "@/views/ProfileView.vue";
import CrudUsersView from "@/views/CrudUsersView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: ProfileView,
		},
		{
			path: "/login",
			name: "Login",
			component: LoginView,
		},
		{
			path: "/signup",
			name: "Signup",
			component: SignUpView,
		},
		{
			path: "/profile",
			name: "Profile",
			component: ProfileView,
		},
		{
			path: "/crudUsers",
			name: "Users Dashboard",
			component: CrudUsersView,
		},
	],
});

router.beforeEach((to, from) => {
	const session = useSessionStore();

	if (!session.token && to.name !== "Login") return "/login";
});

export default router;
