import store from "@/store";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import SignUpView from "@/views/SignUpView.vue";
import ProfileView from "@/views/ProfileView.vue";
import CrudUsersView from "@/views/CrudUsersView.vue";
import BinnacleView from "@/views/BinnacleView.vue";
import SuscriptionView from "@/views/SuscriptionView.vue";
import ProfileFollow from "@/views/ProfileFollow.vue";

const routes = [
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
			requireAdmin: true,
		},
	},
	{
		path: "/binnacle",
		name: "Binnacle",
		component: BinnacleView,
		meta: {
			requireAuth: true,
			requireAdmin: true,
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
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, from) => {
	if ((!store.getters.getToken && to.meta.requireAuth) || (!store.getters.getAdmin && to.meta.requireAdmin)) return "/login";
});

export default router;
