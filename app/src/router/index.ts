import { createRouter, createWebHistory } from "vue-router";
import { useSessionStore } from "@/stores/session";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import ProfileView from "@/views/ProfileView.vue";
import CrudUsersView from "@/views/CrudUsersView.vue";
import BinnacleView from "@/views/BinnacleView.vue";
import SuscriptionView from "@/views/SuscriptionView.vue";
import ProfileFollow from "@/views/ProfileFollow.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: HomeView,
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
			meta: {
				requireAuth: true,
			},
		},
		{
			path: "/crudUsers",
			name: "Users Dashboard",
			component: CrudUsersView,
			meta: {
				requireAuth: true,
			},
		},
		{
			path: "/binnacle",
			name: "Binnacle",
			component: BinnacleView,
			meta: {
				requireAuth: true,
			},
		},
		{
			path: "/suscription",
			name: "Suscription",
			component: SuscriptionView,
			meta: {
				requireAuth: true,
			},
		},
		{
			path: "/profilefollow",
			name: "ProfileFollow",
			component: ProfileFollow,
			meta: {
				requireAuth: true,
			},
		},
	],
});

router.beforeEach((to, from) => {
	const session = useSessionStore();
	if (!session.getToken && to.meta.requireAuth) return "/login";
});

export default router;
