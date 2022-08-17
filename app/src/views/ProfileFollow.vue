<script lang="ts">
	import AppNavbar from "../components/AppNavbar.vue";

	export default {
		name: "ProfileView",
		components: { AppNavbar },
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
								<h4>Nombre de usuario</h4>
								<button class="btn btn-info">Follow</button>
								<hr />
								<p>Email</p>
								<hr />
								<p>City</p>
								<!--<button class="btn btn-outline-primary">Message</button>-->
							</div>
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
