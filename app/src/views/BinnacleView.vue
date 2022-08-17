<script lang="ts">
	import apiRequest from "../utils/apiRequest";
	import AppNavbar from "../components/AppNavbar.vue";

	export default {
		name: "BinnacleView",
		components: { AppNavbar },
		data: function () {
			return {
				logs: [],
			};
		},
		mounted: async function () {
			const response = await apiRequest(`/api/logs`);
			this.logs = response.data;
		},
	};
</script>

<template>
	<main>
		<AppNavbar users-managment profile logout />

		<!--Binnacle-->
		<div class="limiter">
			<div class="container">
				<h1>Binnacle</h1>
				<table class="table">
					<thead class="thead-dark">
						<tr>
							<th scope="col">Type</th>
							<th scope="col">Date</th>
							<th scope="col">User</th>
							<th scope="col">action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="log in logs" :key="log._id">
							<td>{{ log?.Type }}</td>
							<td>{{ log?.Date }}</td>
							<td>{{ log?.userID }}</td>
							<td>{{ log?.action }}</td>
						</tr>
					</tbody>
				</table>
				<!--<button type="button" class="ED btn btn-primary">Add New User</button>-->
			</div>
		</div>
		<div class="b-example-divider"></div>
		<!--binnacle ends-->
	</main>
</template>
