<script>
	import AppNavbar from "../components/AppNavbar.vue";
	import AppFileUploader from "../components/AppFileUploader.vue";

	import moment from "moment";
	import apiRequest from "../utils/apiRequest";

	export default {
		name: "ProfileView",
		components: { AppNavbar, AppFileUploader },
		data: function () {
			return {
				user: {},
				sharedFiles: [],
				followingUsers: [],
				fileIdSelected: null,
				userIdSelected: null,

				processing: false,
			};
		},
		methods: {
			userRequest: async function () {
				const response = await apiRequest(`/api/users?userId=${this.$store.getters.getUserId}`);
				this.user = response.data;
				this.followingUsers = response.data?.following;
			},
			filesRequest: async function () {
				const response = await apiRequest(`/api/files`);
				this.sharedFiles = response.data;
			},
			filesDeleteRequest: async function () {
				this.processing = true;
				const response = await apiRequest(`/api/files/${this.fileIdSelected}`, null, "delete");
				this.filesRequest();
				this.processing = false;
				this.$refs.closeDeleteFileBtn?.click();
			},
			filesShareRequest: async function () {
				this.processing = true;
				const response = await apiRequest(`/api/files/share`, {
					fileID: this.fileIdSelected,
					sharedUserID: this.userIdSelected,
				});
				this.filesRequest();
				this.processing = false;
				this.userIdSelected = null;
				this.fileIdSelected = null;
				this.$refs.closeShareFileBtn?.click();
			},

			fileSelected: function (id) {
				this.fileIdSelected = id;
			},
			moment: function (date) {
				return moment(date).format("MMMM Do YYYY, h:mm:ss a");
			},
		},
		mounted() {
			this.userRequest();
			this.filesRequest();
		},
	};
</script>

<template>
	<main>
		<AppNavbar binnacle users-managment suscribe profile logout />

		<div v-if="user" class="row gutters-sm" style="margin-top: 40px">
			<div class="col-md-4 mb-3">
				<div class="card">
					<div class="card-body">
						<div class="d-flex flex-column align-items-center text-center">
							<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />

							<div class="mt-3">
								<h4>{{ user?.username }}</h4>
							</div>
						</div>
					</div>
				</div>
				<div class="card mb-3">
					<div class="card-body">
						<div class="row">
							<div class="col-sm-3">
								<h6 class="mb-0">Nombre de Usuario</h6>
							</div>
							<div class="col-sm-9 text-secondary">{{ user?.username }}</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<h6 class="mb-0">Email</h6>
							</div>
							<div class="col-sm-9 text-secondary">{{ user?.email }}</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<h6 class="mb-0">Expiration date Suscrip.</h6>
							</div>
							<div class="col-sm-9 text-secondary">{{ moment(user?.subscription) }}</div>
						</div>
						<hr />
						<!-- <div class="row">
							<div class="col-sm-12">
								<button class="btn btn-outline-secondary">Editar datos</button>
							</div>
						</div> -->
					</div>
				</div>
			</div>
			<div class="col-md-8">
				<div class="container">
					<h1>
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-safe2" viewBox="0 0 16 16">
							<path
								d="M1 2.5A1.5 1.5 0 0 1 2.5 1h12A1.5 1.5 0 0 1 16 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 1 14.5V14H.5a.5.5 0 0 1 0-1H1V9H.5a.5.5 0 0 1 0-1H1V4H.5a.5.5 0 0 1 0-1H1v-.5zM2.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5h-12z"
							/>
							<path
								d="M5.035 8h1.528c.047-.184.12-.357.214-.516l-1.08-1.08A3.482 3.482 0 0 0 5.035 8zm1.369-2.303 1.08 1.08c.16-.094.332-.167.516-.214V5.035a3.482 3.482 0 0 0-1.596.662zM9 5.035v1.528c.184.047.357.12.516.214l1.08-1.08A3.482 3.482 0 0 0 9 5.035zm2.303 1.369-1.08 1.08c.094.16.167.332.214.516h1.528a3.483 3.483 0 0 0-.662-1.596zM11.965 9h-1.528c-.047.184-.12.357-.214.516l1.08 1.08A3.483 3.483 0 0 0 11.965 9zm-1.369 2.303-1.08-1.08c-.16.094-.332.167-.516.214v1.528a3.483 3.483 0 0 0 1.596-.662zM8 11.965v-1.528a1.989 1.989 0 0 1-.516-.214l-1.08 1.08A3.483 3.483 0 0 0 8 11.965zm-2.303-1.369 1.08-1.08A1.988 1.988 0 0 1 6.563 9H5.035c.085.593.319 1.138.662 1.596zM4 8.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0zm4.5-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
							/>
						</svg>
						My Vault Dome
					</h1>
					<table class="table">
						<thead class="thead-dark">
							<tr>
								<th scope="col">File Name</th>
								<th scope="col">Create Date</th>
								<th scope="col">Update Date</th>
								<th scope="col">Description</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="file in sharedFiles" :key="file?._id">
								<td>{{ file?.baseDir }}</td>
								<td>{{ moment(file?.createdAt) }}</td>
								<td>{{ moment(file?.updatedAt) }}</td>
								<td>{{ file?.desc }}</td>
								<td>
									<button type="button" class="btn btn-success m-1" data-bs-toggle="modal" data-bs-target="#sendFileModal" @click="fileSelected(file?._id)">
										Send
									</button>
									<button type="button" class="ED btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#deleteModal" @click="fileSelected(file?._id)">
										Delete
									</button>
								</td>
							</tr>
						</tbody>
					</table>
					<button type="button" class="ED btn btn-primary" data-bs-toggle="modal" data-bs-target="#addFileModal" @click="uploadFile">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
							<path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
							<path
								d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
							/>
						</svg>
						Add New File
					</button>
				</div>
			</div>
		</div>
		<!--delete modal-->
		<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Delete User</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">Are you sure you want to delete this File?</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="fileSelected(null)" ref="closeDeleteFileBtn">Close</button>
						<button type="button" class="btn btn-danger" @click="filesDeleteRequest" :disabled="processing">Delete</button>
					</div>
				</div>
			</div>
		</div>

		<AppFileUploader @uploaded="filesRequest" />

		<!--Send file-->
		<div class="modal fade" id="sendFileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Send File</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form>
							<div class="mb-3">
								<label for="SenderUser" class="form-label">Receiver User </label>
								<select class="form-select" aria-label="Default select example" v-model="userIdSelected">
									<option selected>Select the receiving user</option>
									<option v-for="followedUser in followingUsers" :value="followedUser?.id" :key="followedUser?.id">{{ followedUser.username }}</option>
								</select>
							</div>
							<!--<button type="submit" class="btn btn-primary">Submit</button>-->
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="fileSelected(null)" ref="closeShareFileBtn">Close</button>
						<button type="button" class="btn btn-success" @click="filesShareRequest">Send</button>
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
	.row gutters-sm {
		margin-top: 40px;
	}
</style>
