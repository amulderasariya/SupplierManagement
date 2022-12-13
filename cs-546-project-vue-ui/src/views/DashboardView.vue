<template>
	<div class="h-screen bg-gray-100">
		<div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
			<div class="flex min-h-0 flex-1 flex-col bg-gray-800">
				<div class="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
					<IconTruck class="mx-left h-12 w-auto fill-white" />
				</div>
				<div class="flex flex-1 flex-col overflow-y-auto">
					<nav class="flex-1 space-y-1 px-2 py-4">
						<RouterLink v-for="item in navigation" :key="item.name" :to="item.href" class="text-gray-400 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
							<component :is="item.icon" class="text-gray-400 group-hover:text-white mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
							{{ item.name }}
						</RouterLink>
					</nav>
				</div>
			</div>
		</div>
		<div class="flex flex-col md:pl-64">
			<div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
				<div class="flex flex-1 justify-between px-4">
					<div class="flex flex-1">
						<h1 class="mt-6 font-semibold text-gray-900">Welcome, {{ $cookies.get("user").email }}</h1>
					</div>
					<div class="ml-4 flex items-center md:ml-6">
						<div class="relative ml-3">
							<button @click="onLogout" class="bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Logout</button>
						</div>
					</div>
				</div>
			</div>

			<main class="flex-1">
				<div class="py-6">
					<RouterView />
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue";
import router from "../router";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { UsersIcon, PlusCircleIcon, ChartBarIcon, FolderIcon, NewspaperIcon } from "@heroicons/vue/24/outline";
import IconTruck from "../components/icons/IconTruck.vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const navigation = reactive([
	{ name: "Dashboard Analytics", href: "/dashboard/analytics", icon: ChartBarIcon, current: true },
	{ name: "Orders", href: "/dashboard/orders", icon: NewspaperIcon, current: false },
	{ name: "Product Listing", href: "/dashboard/products", icon: FolderIcon, current: false },
	{ name: "Create Product", href: "/dashboard/createproduct", icon: PlusCircleIcon, current: false },
	{ name: "Suppliers", href: "/dashboard/suppliers", icon: UsersIcon, current: false },
]);

const onLogout = async () => {
	try {
		console.log(router);
		await axios.get("/auth/logout");
		toast.success("Logged Out!");
		$cookies.remove("token");
		$cookies.remove("user");
		router.push("/");
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};
</script>

<style scoped>
.router-link-active {
	display: flex;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	padding-left: 0.5rem;
	padding-right: 0.5rem;
	background-color: #111827;
	color: #ffffff;
	font-size: 0.875rem;
	line-height: 1.25rem;
	font-weight: 500;
	align-items: center;
	border-radius: 0.375rem;
}
</style>
