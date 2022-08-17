<script>
	import AppNavbar from "../components/AppNavbar.vue";
	import apiRequest from "../utils/apiRequest";

	export default {
		name: "ProfileView",
		components: { AppNavbar },
		data: function () {
			return {
				user: null,
				showSuccessMessage: false,
				showErrorMessage: false,
				message: null,
			};
		},
		computed: {
			userId: function () {
				return this.$route.params.id;
			},
		},
		methods: {
			userRequest: async function () {
				const response = await apiRequest(`/api/users?userId=${this.userId}`);
				this.user = response.data;
				this.followingUsers = response.data?.following;
			},
			follow: async function () {
				const response = await apiRequest(`/api/users/${this.userId}/follow`);
				if ((response?.data?.message == undefined || response?.data?.message) && !response.data?.accessToken) {
					this.showErrorMessage = true;
					this.message = response.data?.message ?? "Request wasn't proccessed";
					console.debug(response.data);
				} else {
					this.showSuccessMessage = true;
				}
				setTimeout(() => {
					this.$store.commit("setFollowingUsers", { following: [{ id: this.userId }] });
					this.showSuccessMessage = false;
					this.showErrorMessage = false;
					this.message = null;
					if (!response.data?.message) {
						this.$router.push("/profile");
					}
				}, 2000);
			},
			unfollow: async function () {
				const response = await apiRequest(`/api/users/${this.userId}/unfollow`);
				if ((response?.data?.message == undefined || response?.data?.message) && !response.data?.accessToken) {
					this.showErrorMessage = true;
					this.message = response.data?.message ?? "Request wasn't proccessed";
				} else {
					this.showSuccessMessage = true;
				}
				this.$store.commit("dropFollowingUser", { id: this.userId });
				setTimeout(() => {
					this.showSuccessMessage = false;
					this.showErrorMessage = false;
					this.message = null;
					if (!response.data?.message) {
						this.$router.push("/profile");
					}
				}, 2000);
			},
		},
		mounted: function () {
			this.userRequest();
		},
	};
</script>

<template>
	<main>
		<!--Navbar-->
		<AppNavbar home profile logout />
		<!--Navbar ends-->
		<div class="container">
			<div class="row">
				<div class="card">
					<div class="card-body">
						<div class="d-flex flex-column align-items-center text-center">
							<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />

							<div class="mt-3">
								<h4>{{ user?.username }}</h4>
								<button v-if="$store.getters.getFollowingUsers.includes(userId)" class="btn btn-danger" @click="unfollow">Unfollow</button>
								<button v-else class="btn btn-info" @click="follow">Follow</button>
								<hr />
								<p>{{ user?.email }}</p>
								<hr />
								<p>{{ user?.subscription }}</p>
							</div>
						</div>

						<div>
							<h4 v-if="showSuccessMessage" class="mt-4 text-center text-success">DONE</h4>
							<h4 v-if="showErrorMessage" class="mt-4 text-center text-danger">{{ message }}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style>
	main {
		margin-left: 40px !important;
		margin-right: 40px !important;
	}

	.container {
		padding-top: 40px !important;
		width: 50%;
	}
</style>
