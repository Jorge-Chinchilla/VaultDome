<script setup lang="ts">
	import TheWelcome from "@/components/TheWelcome.vue";
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
	</main>
</template>
