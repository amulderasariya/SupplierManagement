<template>
	<div class="mt-10">
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h1 class="text-xl font-medium leading-6 text-gray-900">Create Product</h1>
					<p class="mt-1 text-sm text-gray-600">Product created will be published on product listing</p>
				</div>
			</div>
			<div class="mt-5 md:col-span-2 md:mt-0">
				<Form @submit="onSubmit" :validation-schema="schema">
					<div class="overflow-hidden shadow sm:rounded-md">
						<div class="bg-white px-4 py-5 sm:p-6">
							<div class="grid grid-cols-6 gap-6">
								<div class="col-span-6 sm:col-span-4">
									<label for="name" class="block text-sm font-medium text-gray-700">Product name</label>
									<Field type="text" name="name" id="name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
									<ErrorMessage class="mt-2 text-sm text-red-600" name="name" />
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label for="department" class="block text-sm font-medium text-gray-700">Department</label>
									<Field as="select" id="department" name="department" v-model="selectedDepartment" @change="onSelectDepartment()" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
										<option v-for="department in departmentLookup" :value="department">{{ department }}</option>
									</Field>
									<ErrorMessage class="mt-2 text-sm text-red-600" name="department" />
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label for="category" class="block text-sm font-medium text-gray-700">Category</label>
									<Field as="select" id="category" name="category" v-model="selectedCategory" @change="onSelectCategory()" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
										<option v-for="category in categoryLookup" :value="category">{{ category }}</option>
									</Field>
									<ErrorMessage class="mt-2 text-sm text-red-600" name="category" />
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label for="subCategory" class="block text-sm font-medium text-gray-700">Sub Category</label>
									<Field as="select" id="subCategory" name="subCategory" v-model="selectedSubCategory" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
										<option v-for="subCategory in subCategoryLookup" :value="subCategory">{{ subCategory }}</option>
									</Field>
									<ErrorMessage class="mt-2 text-sm text-red-600" name="subCategory" />
								</div>

								<div class="col-span-6 sm:col-span-6 lg:col-span-3">
									<label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
									<Field type="text" name="stock" id="stock" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
									<ErrorMessage class="mt-2 text-sm text-red-600" name="stock" />
								</div>

								<div class="col-span-6 sm:col-span-3 lg:col-span-3">
									<label for="price" class="block text-sm font-medium text-gray-700">Price</label>
									<div class="relative mt-1 rounded-md shadow-sm">
										<Field type="text" name="price" id="price" class="block w-full rounded-md border-gray-300 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00" />
										<div class="absolute inset-y-0 right-0 flex items-center">
											<label for="currency" class="sr-only">Currency</label>
											<Field as="select" id="currency" name="currency" v-model="selectedCurrency" class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
												<option v-for="(currency, code) in props.currencies" :value="code">{{ code }}</option>
											</Field>
										</div>
									</div>
									<ErrorMessage class="mt-2 text-sm text-red-600" name="price" />
								</div>
							</div>
						</div>
						<div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
							<button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Publish Product</button>
						</div>
					</div>
				</Form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const props = defineProps(["hierarchy", "currencies"]);
const departmentLookup = ref([]);
const categoryLookup = ref([]);
const subCategoryLookup = ref([]);

const selectedDepartment = ref(null);
const selectedCategory = ref(null);
const selectedSubCategory = ref(null);
const selectedCurrency = ref("USD");

departmentLookup.value = Object.keys(props.hierarchy);

const onSelectDepartment = () => {
	selectedCategory.value = null;
	selectedSubCategory.value = null;
	categoryLookup.value = Object.keys(props.hierarchy[selectedDepartment.value]);
};

const onSelectCategory = () => {
	selectedSubCategory.value = null;
	subCategoryLookup.value = Object.keys(props.hierarchy[selectedDepartment.value][selectedCategory.value]);
};

const schema = yup
	.object({
		name: yup
			.string()
			.min(3, "Product name must be at least 3 characters")
			.max(50, "Product name must be less than 50 characters")
			.matches(/^((?!\s{2}).)*$/, "Multiple spaces in between")
			.matches(/[a-zA-Z]/, "Product name must contain only alphabet")
			.test({
				message: "Product name can't contain number",
				test: (value) => {
					const numRegex = /[0-9]/;
					if (numRegex.test(value)) return false;
					return true;
				},
			})
			.test({
				message: "Product name can't contain special characters",
				test: (value) => {
					const specialRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
					if (specialRegex.test(value)) return false;
					return true;
				},
			})
			.required("Product name is required")
			.trim("Product name can't contain leading or trailing spaces"),
		department: yup.string().required("Department is required").nullable(),
		category: yup.string().required("Category is required").nullable(),
		subCategory: yup.string().required("Sub Category is required").nullable(),
		price: yup
			.string()
			.required("Price field is required")
			.matches(/^[0-9]/, "Price must contain only number")
			.trim("Price can't contain leading or trailing spaces"),
		stock: yup
			.string()
			.required("Stock field is required")
			.matches(/^[0-9]/, "Stock must contain only number")
			.trim("Stock can't contain leading or trailing spaces"),
	})
	.strict(true);

const onSubmit = async (values, actions) => {
	const product = {
		name: values.name,
		department: values.department,
		category: values.category,
		subCategory: values.subCategory,
		currency: values.currency,
		price: values.price,
		stock: values.stock,
	};

	try {
		await axios.post("/products", product);
		toast.success("Created new product listing");
		actions.resetForm();
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};
</script>
