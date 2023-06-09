<template>
	<div class="h-screen bg-gray-100">
		<div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
			<div class="flex min-h-0 flex-1 flex-col bg-gray-800">
				<div class="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
					<IconTruck class="mx-left h-12 w-auto fill-white" />
				</div>
				<div class="flex flex-1 flex-col overflow-y-auto">
					<nav class="flex-1 space-y-1 px-2 py-4">
						<div v-for="item in navigation">
							<RouterLink v-if="$cookies.get('user').role === item.role || item.role === 'BOTH'" :key="item.name" :to="item.href" class="text-gray-400 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
								<component :is="item.icon" class="text-gray-400 group-hover:text-white mr-3 flex-shrink-0 h-6 w-6" aria-hidden="true" />
								{{ item.name }}
							</RouterLink>
						</div>
					</nav>
				</div>
				<div class="flex flex-shrink-0 bg-gray-700 p-4">
					<RouterLink to="profile" class="group block w-full flex-shrink-0" exact>
						<div class="flex items-center">
							<div>
								<div>
									<span class="inline-block h-9 w-9 overflow-hidden rounded-full bg-gray-100">
										<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
											<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
										</svg>
									</span>
								</div>
								<!-- <img class="inline-block h-9 w-9 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> -->
							</div>
							<div class="ml-3">
								<p class="text-sm font-medium text-white">{{ $cookies.get("user").organization }}</p>
								<p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
							</div>
						</div>
					</RouterLink>
				</div>
			</div>
		</div>
		<div class="flex flex-col md:pl-64 bg-gray-100">
			<div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
				<div class="flex flex-1 justify-between px-4">
					<div class="flex flex-1">
						<h1 class="mt-6 font-semibold text-gray-900">Welcome, {{ $cookies.get("user").organization }}</h1>
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
					<Suspense>
						<template #default>
							<RouterView />
						</template>
						<template #fallback>
							<Loading />
						</template>
					</Suspense>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
import { reactive } from "vue";
import router from "../router";
import { RouterLink, RouterView } from "vue-router";
import { UsersIcon, PlusCircleIcon, ChartBarIcon, FolderIcon, NewspaperIcon } from "@heroicons/vue/24/outline";
import Loading from "../components/icons/Loading.vue";
import IconTruck from "../components/icons/IconTruck.vue";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const navigation = reactive([
	{ name: "Dashboard Analytics", href: "/dashboard/analytics", icon: ChartBarIcon, current: true, role: "BOTH" },
	{ name: "Orders", href: "/dashboard/orders", icon: NewspaperIcon, current: false, role: "BOTH" },
	{ name: "Product Listing", href: "/dashboard/products", icon: FolderIcon, current: false, role: "BOTH" },
	{ name: "Create Product", href: "/dashboard/createproduct", icon: PlusCircleIcon, current: false, role: "SUPPLIER" },
	{ name: "Suppliers", href: "/dashboard/suppliers", icon: UsersIcon, current: false, role: "OWNER" },
]);

const onLogout = async () => {
	try {
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
