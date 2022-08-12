<script lang="ts">
	import apiRequest from "../utils/apiRequest";

	export default {
		name: "LoginView",
		data: function () {
			return {
				user: null,
				password: null,
			};
		},
		methods: {
			login: async function () {
				// console.debug(await apiRequest("/api/users/", "post"));
			},
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
							<a class="nav-link" aria-current="page" href="#">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Sign up</a>
						</li>
						<li class="nav-item">
							<a class="nav-link active" href="#">Login</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<!--Navbar ends-->

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
					<label for="UserName" class="form-label">User Name</label>
					<input v-model="user" type="text" class="form-control" id="user-name" placeholder="e.g. User504" />
				</div>
				<div class="mb-3">
					<label for="password" class="form-label">Password</label>
					<input v-model="usepasswordr" type="password" class="form-control" id="password" placeholder="e.g. user@pass1234" />
				</div>
				<div id="btn-sup" class="mb-3">
					<button id="" type="button" class="btn btn-outline-secondary" @click="login">
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
