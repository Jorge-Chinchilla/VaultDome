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
							<a class="nav-link active" href="#">Binnacle</a>
						</li>
                        <li class="nav-item">
							<a class="nav-link" href="#">Users Management</a>
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
                            <th scope="col">Object</th>
							<th scope="col">action</th>
							
						</tr>
					</thead>
					<tbody>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
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