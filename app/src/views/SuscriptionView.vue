<script>
	import apiRequest from "../utils/apiRequest";

	import AppNavbar from "../components/AppNavbar.vue";

	export default {
		name: "SuscriptionView",
		components: { AppNavbar },
		data: function () {
			return {
				successMessage: false,
			};
		},
		methods: {
			subscribe: async function (months) {
				const response = await apiRequest(`/api/subs`, { months: months });
				this.successMessage = true;
				setTimeout(() => {
					this.$router.push("/profile");
				}, 3000);
			},
		},
	};
</script>

<template>
	<main>
		<AppNavbar binnacle users-managment profile logout />

		<!--cards-->
		<div class="container">
			<div class="row">
				<div class="col-4">
					<div class="card" style="width: 18rem">
						<div class="card-body">
							<h5 class="card-title" style="color: cornflowerblue">Basic</h5>
							<br />

							<p class="card-text">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style="color: cornflowerblue"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-clock"
									viewBox="0 0 16 16"
								>
									<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
									<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
								</svg>
								1 months
							</p>
							<p class="card-text">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style="color: cornflowerblue"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-people-fill"
									viewBox="0 0 16 16"
								>
									<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
									<path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
									<path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
								</svg>
								100 followes
							</p>
							<p class="card-text">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style="color: cornflowerblue"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-file-arrow-up-fill"
									viewBox="0 0 16 16"
								>
									<path
										d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7.5 6.707 6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707z"
									/>
								</svg>
								1000 files transfer
							</p>
							<br />
							<a href="#" class="btn btn-primary" @click="subscribe(1)">Subscribe</a>
						</div>
					</div>
				</div>

				<div class="col-4">
					<div class="card" style="width: 18rem">
						<div class="card-body">
							<h5 class="card-title" style="color: darkolivegreen">Standard</h5>
							<br />
							<p class="card-text">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style="color: darkolivegreen"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-clock"
									viewBox="0 0 16 16"
								>
									<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
									<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
								</svg>
								3 months
							</p>
							<p class="card-text">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style="color: darkolivegreen"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-people-fill"
									viewBox="0 0 16 16"
								>
									<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
									<path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
									<path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
								</svg>
								1000 followes
							</p>
							<p class="card-text">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style="color: darkolivegreen"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-file-arrow-up-fill"
									viewBox="0 0 16 16"
								>
									<path
										d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7.5 6.707 6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707z"
									/>
								</svg>
								10000 files transfer
							</p>
							<br />
							<a href="#" class="btn btn-primary" @click="subscribe(3)">Subscribe</a>
						</div>
					</div>
				</div>

				<div class="col-4">
					<div class="card" style="width: 18rem">
						<div class="card-body">
							<h5 class="card-title" style="color: crimson">Premium</h5>
							<br />
							<p class="card-text">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style="color: crimson"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-clock"
									viewBox="0 0 16 16"
								>
									<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
									<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
								</svg>
								12 months
							</p>
							<p class="card-text">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style="color: crimson"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-people-fill"
									viewBox="0 0 16 16"
								>
									<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
									<path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
									<path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
								</svg>
								Unlimited followes
							</p>
							<p class="card-text">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									style="color: crimson"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-file-arrow-up-fill"
									viewBox="0 0 16 16"
								>
									<path
										d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM7.5 6.707 6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707z"
									/>
								</svg>
								Unlimited files transfer
							</p>
							<br />
							<a href="#" class="btn btn-primary" style="ficolor: crimson" @click="subscribe(12)">Subscribe</a>
						</div>
					</div>
				</div>

				<div v-if="successMessage" class="col-12 text-success text-uppercase fw-medium text-center mt-5">
					<h4>Subscription added!</h4>
				</div>
			</div>
		</div>
		<!--cards ends-->
	</main>
</template>

<style>
	main {
		margin-left: 40px !important;
		margin-right: 40px !important;
	}
	.row gutters-sm {
		margin-top: 40px;
	}

	.container {
		padding-top: 150px;
	}
</style>
