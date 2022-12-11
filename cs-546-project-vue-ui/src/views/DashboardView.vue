<template>
	<div class="h-screen bg-gray-100">
		<div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
			<div class="flex min-h-0 flex-1 flex-col bg-gray-800">
				<div class="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
					<IconTruck class="mx-left h-12 w-auto fill-white" alt="Truck Icon" />
				</div>
				<div class="flex flex-1 flex-col overflow-y-auto">
					<nav class="flex-1 space-y-1 px-2 py-4">
						<RouterLink v-for="item in navigation" @click="changeCurrentTab(item)" :key="item.name" :to="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
							<component :is="item.icon" :class="[item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
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
						<h1 class="mt-6 font-semibold text-gray-900">Welcome, Godwyn James William</h1>
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
import router from "../router";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { PlusCircleIcon, ChartBarIcon, FolderIcon, NewspaperIcon } from "@heroicons/vue/24/outline";
import IconTruck from "../components/icons/IconTruck.vue";

const navigation = [
	{ name: "Dashboard Analytics", href: "/dashboard/analytics", icon: ChartBarIcon, current: true },
	{ name: "Orders", href: "/dashboard/orders", icon: NewspaperIcon, current: false },
	{ name: "Product Listing", href: "/dashboard/products", icon: FolderIcon, current: false },
	{ name: "Create Product", href: "#", icon: PlusCircleIcon, current: false },
];

const changeCurrentTab = (item) => {
	for (let i = 0; i < navigation.length; i++) {
		if (navigation[i].current) navigation[i].current = false;
		if (navigation[i].name === item.name) navigation[i].current = true;
	}
};

const onLogout = () => {
	$cookies.remove("token");
	router.push("/");
};
</script>
