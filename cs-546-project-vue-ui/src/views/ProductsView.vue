<template>
	<div class="h-full px-4 sm:px-6 lg:px-8">
		<h2 class="text-2xl ml-2 font-bold tracking-tight text-gray-900">Product Listing</h2>

		<div class="bg-white shadow sm:rounded-lg mt-2">
			<div class="px-4 py-5 sm:p-6">
				<div class="sm:flex sm:items-start sm:justify-between">
					<div>
						<h3 class="text-lg font-medium leading-6 text-gray-900">Filters</h3>
						<div class="mt-2 max-w-xl text-sm text-gray-500">
							<p>Filter products by supplier & catergory</p>
						</div>
					</div>
					<SimpleSelect heading="Categories" :data="categories" />
					<SimpleSelect heading="Suppliers" :data="suppliers" />
					<div class="mt-5 items-center">
						<button type="button" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">Clear All</button>
					</div>
				</div>
			</div>
		</div>

		<div class="mx-auto max-w-2xl lg:max-w-7xl">
			<div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
				<div v-for="product in products" @click="open = true" :key="product.id" class="group relative">
					<div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
						<img :src="product.imageSrc" :alt="product.imageAlt" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
					</div>
					<div class="mt-4 flex justify-between">
						<div>
							<h3 class="text-sm text-gray-700">
								<a :href="product.href">
									<span aria-hidden="true" class="absolute inset-0" />
									{{ product.name }}
								</a>
							</h3>
							<p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
						</div>
						<p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<ProductModal :open="open" @close="open = false" />
</template>

<script setup>
import { ref } from "vue";
import ProductModal from "../components/ProductModal.vue";
import SimpleSelect from "../components/SimpleSelect.vue";

let open = ref(false);

const products = [
	{
		id: 1,
		name: "Basic Tee",
		href: "#",
		imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
	{
		id: 1,
		name: "Basic Tee",
		href: "#",
		imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
	{
		id: 1,
		name: "Basic Tee",
		href: "#",
		imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
	{
		id: 1,
		name: "Basic Tee",
		href: "#",
		imageSrc: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg",
		imageAlt: "Front of men's Basic Tee in black.",
		price: "$35",
		color: "Black",
	},
];

const categories = [
	{ id: 1, name: "Entertainment" },
	{ id: 2, name: "Food" },
	{ id: 3, name: "Apparel" },
	{ id: 4, name: "HL" },
	{ id: 5, name: "Consumables" },
	{ id: 6, name: "Health & Wellness" },
	{ id: 7, name: "Home" },
	{ id: 8, name: "Toys/Seasonal" },
	{ id: 9, name: "Others" },
];

const suppliers = [
	{ id: 1, name: "Wade Cooper" },
	{ id: 2, name: "Arlene Mccoy" },
	{ id: 3, name: "Devon Webb" },
	{ id: 4, name: "Tom Cook" },
	{ id: 5, name: "Tanya Fox" },
	{ id: 6, name: "Hellen Schmidt" },
	{ id: 7, name: "Caroline Schultz" },
	{ id: 8, name: "Mason Heaney" },
	{ id: 9, name: "Claudie Smitham" },
	{ id: 10, name: "Emil Schaefer" },
];
</script>
