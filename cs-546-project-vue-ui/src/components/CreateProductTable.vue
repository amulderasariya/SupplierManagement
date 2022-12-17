<template>
	<div class="pt-6">
		<div class="sm:flex sm:items-center">
			<div class="sm:flex-auto">
				<h1 class="text-xl font-semibold text-gray-900">Products</h1>
				<p class="mt-2 text-sm text-gray-700">A list of all the existing products</p>
			</div>
			<div class="w-1/5 pl-1 pb-4 mt-5">
				<label for="search" class="sr-only">Search</label>
				<div class="mt-1 relative rounded-md shadow-sm">
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
						<svg class="mr-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
						</svg>
					</div>
					<input id="search" v-model="search" type="text" name="search" class="focus:ring-blue-200 focus:border-blue-200 block w-full pl-9 sm:text-sm border-gray-300 rounded-md" placeholder="Search" />
				</div>
			</div>
		</div>
		<div class="mt-8 flex flex-col">
			<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table class="min-w-full divide-y divide-gray-300">
							<thead class="bg-gray-50">
								<tr class="divide-x divide-gray-200">
									<th scope="col" class="py-3.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pl-4">Name</th>
									<th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
									<th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
									<th scope="col" class="px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Sub Category</th>
									<th scope="col" class="py-3.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pr-6">Price</th>
									<th scope="col" class="py-3.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pr-6">Stock</th>
									<th scope="col" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
										<span class="sr-only">Join as supplier</span>
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								<tr v-for="product in filteredProducts" :key="product.email" class="divide-x divide-gray-200">
									<td class="whitespace-nowrap py-2 pl-2 pr-2 text-sm font-medium text-gray-900 sm:pl-4">{{ product.name }}</td>
									<td class="whitespace-nowrap p-2 text-sm text-gray-500">{{ product.department }}</td>
									<td class="whitespace-nowrap p-2 text-sm text-gray-500">{{ product.category }}</td>
									<td class="whitespace-nowrap p-2 text-sm text-gray-500">{{ product.subCategory }}</td>
									<td class="whitespace-nowrap py-2 pl-2 pr-2 text-sm text-gray-500 sm:pr-6">{{ currencyFilter(product) }}</td>
									<td class="whitespace-nowrap py-2 pl-2 pr-2 text-sm text-gray-500 sm:pr-6">{{ product.stock }}</td>
									<td class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
										<button
											type="button"
											@click="onJoinProduct(product)"
											class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											Join
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
	<CreateProductModal v-if="open" :open="open" @close="open = false" :product="selectedProduct" />
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import CreateProductModal from "./CreateProductModal.vue";

const open = ref(false);
const search = ref("");
const selectedProduct = ref({});
const products = await axios.get("/products");

const onJoinProduct = (product) => {
	selectedProduct.value = product;
	open.value = true;
};

const currencyFilter = (product) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: product.currency,
	});
	return formatter.format(product.price);
};

const filteredProducts = computed(() => {
	return products.data.filter((product) => {
		let flag = false;
		if (product.name && !flag) flag = product.name.toLowerCase().indexOf(search.value.toLowerCase()) !== -1;
		if (product.department && !flag) flag = product.department.toLowerCase().indexOf(search.value.toLowerCase()) !== -1;
		if (product.category && !flag) flag = product.category.toLowerCase().indexOf(search.value.toLowerCase()) !== -1;
		if (product.subCategory && !flag) flag = product.subCategory.toLowerCase().indexOf(search.value.toLowerCase()) !== -1;
		if (product.stock && !flag) flag = product.stock.toString().toLowerCase().indexOf(search.value.toLowerCase()) !== -1;
		return flag;
	});
});
</script>
