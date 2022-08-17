<script>
	import apiRequest from "../utils/apiRequest";

	export default {
		name: "AppFileUploader",
		emits: ["uploaded"],
		data: function () {
			return {
				showSuccessMessage: false,
				showErrorMessage: false,
				description: null,
			};
		},
		methods: {
			uploadFile: async function () {
				const formData = new FormData();
				formData.append("uploadedFile", this.$refs.file.files[0]);
				formData.append("description", this.description);

				const response = await apiRequest(`/api/files`, formData);

				if (response.data?.url) {
					this.showSuccessMessage = true;
				} else {
					this.showErrorMessage = true;
				}

				setTimeout(() => {
					this.$refs.closeBtn?.click();
					this.showSuccessMessage = false;
					this.showErrorMessage = false;
					this.description = null;
				}, 3000);

				this.$emit("uploaded");
			},
		},
	};
</script>

<template>
	<!--Add new file Modal-->
	<div class="modal fade" id="addFileModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Add New File</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form>
						<div class="mb-3">
							<label for="file" class="form-label">Please, Add NeW file.</label>
							<input type="file" ref="file" id="file" />
						</div>
						<div class="mb-3">
							<label for="description" class="form-label">Description.</label>
							<input type="text" v-model="description" id="description" class="input-text" />
						</div>
						<!--<button type="submit" class="btn btn-primary">Submit</button>-->
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="closeBtn">Close</button>
					<button type="button" class="btn btn-primary" @click="uploadFile">Save</button>

					<div class="w-100">
						<p v-show="showSuccessMessage" class="text-success">Image uploaded!</p>
						<p v-show="showErrorMessage" class="text-danger">Error. Image not uploaded :(</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
