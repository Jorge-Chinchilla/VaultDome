<script>
	import apiRequest from "../utils/apiRequest";

	export default {
		name: "CrudUsersView",
		data: function () {
			return {
				users: [],
				user: null,
				message: null,
			};
		},
		methods: {
			getUsers: async function () {
				const response = await apiRequest(`/api/users/all`);
				this.users = response.data;
			},
			setUserId: function (id) {
				this.user = id;
			},
			deleteUser: async function () {
				const response = await apiRequest(`/api/users/${this.user}`, null, "delete");
				if (response.data?.message) {
					this.message = response.data?.message;
				} else {
					this.message = "Error";
				}

				setTimeout(() => {
					this.message = null;
				}, 3000);

				this.getUsers();

				this.user = null;
				this.$refs.closeDeleteBtn?.click();
			},
		},
		mounted: function () {
			this.getUsers();
		},
	};
</script>

<template>
	<main>
		<!--Navbar-->
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
				<div class="collapse navbar-collapse" id="navbarNav" style="padding-left: 60%">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link active" href="#">Users Management</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" aria-current="page" href="#">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Profile</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<!--Navbar ends-->

		<!--CRUD users-->
		<div class="limiter">
			<div class="container">
				<h1>CRUD Users</h1>
				<h4 v-if="message == 'Error'" class="text-danger">{{ message }}</h4>
				<h4 v-if="message != 'Error'" class="text-success">{{ message }}</h4>
				<table class="table">
					<thead class="thead-dark">
						<tr>
							<th scope="col">User Name</th>
							<th scope="col">Email</th>
							<th scope="col">Is Admin</th>
							<th scope="col">Subscription</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="user in users" :key="user?._id">
							<td>{{ user?.username }}</td>
							<td>{{ user?.email }}</td>
							<td>{{ user?.isAdmin }}</td>
							<td>{{ user?.subscription }}</td>
							<td>
								<button type="button" class="ED btn btn-warning" :ref="'editUserBtn' + user?._id">Edit</button>
								<button type="button" class="ED btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" @click="setUserId(user?._id)">
									Delete
								</button>
							</td>
						</tr>
					</tbody>
				</table>
				<button type="button" class="ED btn btn-primary">Add New User</button>
			</div>
		</div>
		<div class="b-example-divider"></div>
		<!--CRUD users ends-->

		<!--delete modal-->
		<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Delete User</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">Are you sure you want to delete this user?</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeDeleteBtn">Close</button>
						<button type="button" class="btn btn-danger" @click="deleteUser(user?._id)">Delete</button>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style>
	.ED {
		margin-left: 8px;
	}
</style>
