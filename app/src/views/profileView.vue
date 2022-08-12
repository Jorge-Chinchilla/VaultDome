<script lang="ts">
	export default {
		name: "ProfileView",
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
						<!--<li class="nav-item">
                <a class="nav-link " href="#">Sign in</a>
                </li> -->
						<li class="nav-item">
							<a class="nav-link active" href="#">Profile</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<!--Navbar ends-->

		<div class="row gutters-sm" style="margin-top: 40px">
			<div class="col-md-4 mb-3">
				<div class="card">
					<div class="card-body">
						<div class="d-flex flex-column align-items-center text-center">
							<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />

							<div class="mt-3">
								<h4>Nombre de usuario</h4>
								<!--<button class="btn btn-outline-secondary">Follow</button>
                      <button class="btn btn-outline-primary">Message</button>-->
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-8">
				<div class="card mb-3">
					<div class="card-body">
						<div class="row">
							<div class="col-sm-3">
								<h6 class="mb-0">Nombre de Usuario</h6>
							</div>
							<div class="col-sm-9 text-secondary">Ejemplo Nombre</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<h6 class="mb-0">Email</h6>
							</div>
							<div class="col-sm-9 text-secondary">email@ejemplo.com</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-3">
								<h6 class="mb-0">Ciudad</h6>
							</div>
							<div class="col-sm-9 text-secondary">Ejemplo ciudad</div>
						</div>
						<hr />
						<div class="row">
							<div class="col-sm-12">
								<button class="btn btn-outline-secondary">Editar datos</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-12">
					<div class="row">
						<div class="col-2">
							<button class="btn btn-outline-secondary">Enviar Archivo</button>
						</div>
						<div class="col-2">
							<button class="btn btn-outline-secondary">Buzon de Archivos</button>
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
	.row gutters-sm {
		margin-top: 40px;
	}
</style>
