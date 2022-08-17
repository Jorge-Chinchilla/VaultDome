<script lang="ts">
	import { mapActions, mapState } from "pinia";
	import { useSessionStore } from "../stores/session";

	export default {
		name: "AppNavbar",
		emits: ["logout", "login", "home", "profile", "binnacle", "usersManagment", "suscribe"],
		props: {
			logout: Boolean,
			login: Boolean,
			signup: Boolean,
			home: Boolean,
			profile: Boolean,
			binnacle: Boolean,
			usersManagment: Boolean,
			suscribe: Boolean,
		},
		computed: {
			...mapState(useSessionStore, ["getSubscriptionStatus"]),
		},
		methods: {
			...mapActions(useSessionStore, ["setLogout"]),

			goToLogin: function () {
				this.$router.push("/login");
			},
			goToSignup: function () {
				this.$router.push("/signup");
			},
			goToHome: function () {
				this.$router.push("/home");
			},
			goToProfile: function () {
				this.$router.push("/profile");
			},
			goToBinnacle: function () {
				this.$router.push("/binnacle");
			},
			goToUsersManagment: function () {
				this.$router.push("/usersManagment");
			},
			goToSuscribe: function () {
				this.$router.push("/suscribe");
			},
			goLogout: function () {
				this.setLogout();
				this.$router.push("/login");
			},
		},
	};
</script>

<template>
	<nav class="navbar navbar-expand-lg bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="#"><img src="../assets/img/logo.png" class="img-fluid" style="max-with:100%, max-height:100%" />Vault Dome</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
				<ul class="navbar-nav">
					<li v-if="home" class="nav-item clicklable">
						<a class="nav-link" @click="goToHome">Home</a>
					</li>
					<li v-if="binnacle" class="nav-item clicklable">
						<a class="nav-link" @click="goToBinnacle">Binnacle</a>
					</li>
					<li v-if="usersManagment" class="nav-item clicklable">
						<a class="nav-link" @click="goToUsersManagment">Users M.</a>
					</li>
					<li v-if="suscribe && !getSubscriptionStatus" class="nav-item clicklable">
						<a class="nav-link" @click="goToSuscribe">Suscribe</a>
					</li>
					<li v-if="profile" class="nav-item clicklable">
						<a class="nav-link" @click="goToProfile">Profile</a>
					</li>
					<li v-if="signup" class="nav-item clicklable">
						<a class="nav-link" @click="goToSignup">Sign up</a>
					</li>
					<li v-if="login" class="nav-item clicklable">
						<a class="nav-link" @click="goToLogin">Login</a>
					</li>
					<li v-if="logout" class="nav-item clicklable">
						<a class="nav-link" @click="goLogout">Logout</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
