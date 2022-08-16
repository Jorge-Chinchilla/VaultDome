<script setup lang="ts">
	//import TheWelcome from "@/components/TheWelcome.vue";
</script>

<style scoped></style>

<template>
	<main>
		<!--Navbar-->
		<nav class="navbar navbar-expand-lg bg-light">
			<div class="container-fluid">
				<a class="navbar-brand" href="#"><img src="../assets/img/logo.png" style="max-with:100%, max-height:100%" />Vault Dome</a>
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
							<a class="nav-link active" aria-current="page" href="#">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Sign in</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Login</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<!--Navbar ends-->
		<div class="container">
			<div id="content" class=" row">
				<div class="col-md-6 padre">
				<div class="card">
					<div class="card-body">
						<h1 class="d-flex flex-column align-items-center text-center">Vault Dome</h1>
						<hr />
						<div class="d-flex flex-column align-items-center text-center">
							<div class="mt-3">
								
								<p>Vault Dome es un sistema multidispositivo (web y móvil) disponible para todo tipo de usuario en la red, que tiene como objetivo la transferencia segura de documentos que requieran gran seguridad en su envío a otros usuarios.</p>
                      			<button class="btn btn-outline-primary">Sign in</button>
								<button class="btn btn-outline-primary" >Login</button>
							</div>
						</div>
					</div>
				</div>
					
				</div>
				<div class="col-md-6 d-flex flex-column align-items-center text-center padre">
					<img src="../assets/img/lp.png" alt="" class="" width="" />
				</div>
			</div>
		</div>

	</main>
</template>

<style>
	.container{
		background-color:#8AC9FE !important;
		height: 500px;
		width: 100% !important;
		margin-top: 35px;
	}

	button{
		margin-left: 10px;
	}

	.padre {
		display: flex;
		align-items: center;
	}
</style>

