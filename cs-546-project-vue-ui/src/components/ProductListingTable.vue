<template>
	<div class="mt-8 flex flex-col">
		<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					<table class="min-w-full table-fixed divide-y divide-gray-300">
						<thead class="bg-gray-50">
							<tr>
								<th scope="col" class="sr-only relative w-12 px-6 sm:w-16 sm:px-8"></th>
								<th scope="col" class="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Categories</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Sub Categories</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Stock</th>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							<tr v-for="product in props.products" :key="product._id" :class="[selectedProductsID.includes(product) && 'bg-gray-50']">
								<td class="relative w-12 px-6 sm:w-16 sm:px-8">
									<input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6" :value="product" v-model="selectedProductsID" @change="$emit('update:modelValue', selectedProductsID)" />
								</td>
								<td :class="['whitespace-nowrap py-4 pr-3 text-sm font-medium', selectedProductsID.includes(product) ? 'text-indigo-600' : 'text-gray-900']">
									{{ product.name }}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{{ product.department }}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{{ product.category }}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{{ product.subCategory }}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{{ product.stock }}
								</td>
								<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
									{{ currencyFilter(product) }}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
	modelValue: {
		type: Array,
		default: [],
		required: true,
	},
	products: {
		type: Array,
		required: true,
	},
});

const selectedProductsID = ref(props.modelValue);

const currencyFilter = (product) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: product.currency,
	});
	return formatter.format(product.price);
};
</script>
