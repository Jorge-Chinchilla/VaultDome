<script>
	import apiRequest from "../utils/apiRequest";
	import AppNavbar from "../components/AppNavbar.vue";

	export default {
		name: "LoginView",
		components: {
			AppNavbar,
		},
		data: function () {
			return {
				email: null,
				password: null,
				showErrorMessage: false,
			};
		},
		methods: {
			requestLogin: async function () {
				const response = await apiRequest("/api/auth/login", { email: this.email, password: this.password });
				if (response.data) {
					this.$store.commit("setLogin", {
						accessToken: response.data?.accessToken,
						userId: response.data?.userId,
						isAdmin: response.data?.isAdmin,
						subscription: response.data?.subscription,
					});
					this.$router.push("/profile");
				} else {
					this.showErrorMessage = true;
					setTimeout(() => {
						this.showErrorMessage = false;
					}, 3000);
				}
			},
		},
		beforeMount() {
			this.$store.commit("setLogout");
		},
	};
</script>

<template>
	<main>
		<AppNavbar home signup />

		<!--Sign up form-->
		<div id="signup-f">
			<div id="signup-s">
				<div id="btn-sup" class="mb-3">
					<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
						<path
							d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
						/>
					</svg>
					<h3>Login</h3>
				</div>
				<div class="mb-3">
					<label for="email" class="form-label">Email</label>
					<input v-model="email" type="text" class="form-control" id="email" placeholder="e.g. mail@mail.com" />
				</div>
				<div class="mb-3">
					<label for="password" class="form-label">Password</label>
					<input v-model="password" type="password" class="form-control" id="password" placeholder="e.g. user@pass1234" />
				</div>
				<div id="btn-sup" class="mb-3">
					<button id="" type="button" class="btn btn-outline-secondary" @click.stop="requestLogin">
						Login
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
							<path
								fill-rule="evenodd"
								d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
							/>
							<path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
						</svg>
					</button>
				</div>

				<Transition>
					<div v-show="showErrorMessage" class="mt-3">
						<small class="text-danger text-uppercase">Wrong credentials, try again...</small>
					</div>
				</Transition>
			</div>
		</div>
		<!--Sign up ends-->
	</main>
</template>

<style>
	body {
		font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
	}

	#btn-sup {
		text-align: center;
	}

	#signup-f {
		height: 500px;
		border: 10px #fff solid;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 6%;
	}

	#signup-s {
		width: 500px;
		border: 10px rgb(248, 249, 250) solid;
		border-radius: 10px;
		padding: 15px;
	}
</style>
