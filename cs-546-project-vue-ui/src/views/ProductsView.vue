<template>
	<div class="h-full px-4 sm:px-6 lg:px-8">
		<h2 class="text-2xl ml-2 font-bold tracking-tight text-gray-900">Product Listing</h2>

		<div class="bg-white shadow sm:rounded-lg mt-2">
			<div class="px-4 py-5 sm:p-6">
				<div class="sm:flex sm:items-start sm:justify-between">
					<SupplierSelect heading="Suppliers" v-model="selectedSupplier" @update:model-value="getProductsBySupplierID()" :options="selectSupplierOptions.data" class="w-1/5" />
					<SimpleSelect heading="Department" v-model="selectedDepartment" @update:model-value="onSelectDepartment()" :options="selectDepartmentOptions" class="w-1/5" />
					<SimpleSelect heading="Categories" v-model="selectedCategory" @update:model-value="onSelectCategory()" :options="selectCategoryOptions" class="w-1/5" />
					<SimpleSelect heading="Sub Categories" v-model="selectedSubCategory" :options="selectSubCategoryOptions" class="w-1/5" />

					<div class="mt-5 items-center">
						<button type="button" @click="clearFilters" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">
							Clear All
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-6 ml-2 mr-2">
			<div class="sm:flex sm:items-center">
				<div class="sm:flex-auto">
					<h1 class="text-xl font-semibold text-gray-900">Product Listing</h1>
					<p class="mt-2 text-sm text-gray-700">A list of all the products in your account</p>
				</div>
				<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
					<button
						v-if="$cookies.get('user').role === 'OWNER'"
						type="button"
						@click="open = true"
						:disabled="!selectedProductsID.length"
						class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
					>
						Place Purchase Order
					</button>
				</div>
			</div>
			<ProductListingTable v-if="refresh" v-model="selectedProductsID" :products="filteredProducts" />
		</div>
	</div>
	<ProductModal
		v-if="open"
		:open="open"
		@close="
			open = false;
			clearFilters();
		"
		:selectedSupplier="selectedSupplier"
		:products="selectedProductsID"
		:currencies="currencies.data"
	/>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import ProductModal from "../components/ProductModal.vue";
import SimpleSelect from "../components/SimpleSelect.vue";
import SupplierSelect from "../components/SupplierSelect.vue";
import ProductListingTable from "../components/ProductListingTable.vue";

const toast = useToast();
const open = ref(false);
const refresh = ref(true);
const products = ref([]);
const selectedProductsID = ref([]);

const hierarchy = ref(null);
const currencies = ref(null);
const selectDepartmentOptions = ref(null);
const selectCategoryOptions = ref(null);
const selectSubCategoryOptions = ref(null);
const selectSupplierOptions = ref(null);

const selectedDepartment = ref(null);
const selectedCategory = ref(null);
const selectedSubCategory = ref(null);
const selectedSupplier = ref(null);

const getProductsBySupplierID = async () => {
	products.value = await axios.get("/products", { params: { supplierID: selectedSupplier.value._id } });
};

try {
	hierarchy.value = await axios.get("/lookup/hierarchy");
	currencies.value = await axios.get("/lookup/currencies");
	selectDepartmentOptions.value = Object.keys(hierarchy.value.data);
	selectSupplierOptions.value = await axios.get("/auth/users/SUPPLIER");
	selectedSupplier.value = selectSupplierOptions.value.data[0];
	await getProductsBySupplierID();
} catch (e) {
	toast.error(e.response.data.message);
}

const clearFilters = async () => {
	refresh.value = false;
	selectedDepartment.value = null;
	selectedCategory.value = null;
	selectedSubCategory.value = null;
	selectCategoryOptions.value = null;
	selectSubCategoryOptions.value = null;
	selectedProductsID.value = [];
	await getProductsBySupplierID();
	refresh.value = true;
};

// const placeOrder = async () => {
// 	console.log(selectedProductsID.value);
// 	const order = {
// 		supplierID: selectedSupplier.value,
// 		invoiceProducts: [],
// 		currency: "USD",
// 	};
// 	for (const id in selectedProductsID.value) {
// 		order.invoiceProducts.push({
// 			productID: id,
// 			quantity: "12",
// 		});
// 	}

// 	console.log(order);
// };

const filteredProducts = computed(() => {
	return products.value.data.filter((product) => {
		if (selectedSubCategory.value) return product.subCategory === selectedSubCategory.value;
		else if (selectedCategory.value) return product.category === selectedCategory.value;
		else if (selectedDepartment.value) return product.department === selectedDepartment.value;
		else return true;
	});
});

const onSelectDepartment = () => {
	selectedCategory.value = null;
	selectedSubCategory.value = null;
	selectCategoryOptions.value = Object.keys(hierarchy.value.data[selectedDepartment.value]);
};

const onSelectCategory = () => {
	selectedSubCategory.value = null;
	selectSubCategoryOptions.value = Object.keys(hierarchy.value.data[selectedDepartment.value][selectedCategory.value]);
};
</script>
