<template>
	<main class="min-h-screen bg-cover bg-top sm:bg-top">
		<div class="max-w-7xl mx-auto px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-24">
			<p class="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">404 error</p>
			<h1 class="mt-2 text-4xl font-extrabold text-black tracking-tight sm:text-5xl">Uh oh! I think you’re lost.</h1>
			<p class="mt-2 text-lg font-medium text-black text-opacity-50">It looks like the page you’re looking for doesn't exist.</p>
			<div class="mt-6">
				<RouterLink to="/" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-black bg-opacity-25 hover:bg-opacity-50">Go Back</RouterLink>
			</div>
			<div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
				<div class="max-w-3xl mx-auto">
					<img src=".././assets/page-not-found.jpg" />
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import { RouterLink } from "vue-router";
</script>
