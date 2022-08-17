<script>
	import AppNavbar from "../components/AppNavbar.vue";

	export default {
		name: "HomeView",
		components: {
			AppNavbar,
		},
	};
</script>

<style scoped></style>

<template>
	<main>
		<AppNavbar login signup />

		<div id="clp" class="container">
			<div id="content" class="row">
				<div class="col-md-6 padre">
					<div class="card">
						<div class="card-body">
							<h1 class="d-flex flex-column align-items-center text-center">Vault Dome</h1>
							<hr />
							<div class="d-flex flex-column align-items-center text-center">
								<div class="mt-3">
									<p>
										Vault Dome es un sistema multidispositivo (web y móvil) disponible para todo tipo de usuario en la red, que tiene como objetivo la
										transferencia segura de documentos que requieran gran seguridad en su envío a otros usuarios.
									</p>
									<button class="btn btn-outline-primary" @click="$router.push('/signup')">Sign up</button>
									<button class="btn btn-outline-primary" @click="$router.push('/login')">Login</button>
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
	.container {
		width: 100% !important;
	}

	button {
		margin-left: 10px;
	}

	.padre {
		display: flex;
		align-items: center;
	}

	#clp {
		background-color: #8ac9fe !important;
		width: 100% !important;
		margin-top: 35px;
	}
</style>
