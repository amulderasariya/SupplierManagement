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
				<Form>
					<div class="overflow-hidden shadow sm:rounded-md">
						<div class="bg-white px-4 py-5 sm:p-6">
							<div class="grid grid-cols-6 gap-6">
								<div class="col-span-6 sm:col-span-4">
									<label for="email-address" class="block text-sm font-medium text-gray-700">Product name</label>
									<Field type="text" name="email-address" id="email-address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label for="department" class="block text-sm font-medium text-gray-700">Department</label>
									<Field as="select" id="department" name="department" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
										<option>United States</option>
										<option>Canada</option>
										<option>Mexico</option>
									</Field>
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label for="category" class="block text-sm font-medium text-gray-700">Category</label>
									<Field as="select" id="category" name="category" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
										<option>United States</option>
										<option>Canada</option>
										<option>Mexico</option>
									</Field>
								</div>

								<div class="col-span-6 sm:col-span-3">
									<label for="subCategory" class="block text-sm font-medium text-gray-700">Sub Category</label>
									<Field as="select" id="subCategory" name="subCategory" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
										<option>United States</option>
										<option>Canada</option>
										<option>Mexico</option>
									</Field>
								</div>

								<div class="col-span-6 sm:col-span-6 lg:col-span-3">
									<label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
									<Field type="text" name="stock" id="stock" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
								</div>

								<div class="col-span-6 sm:col-span-3 lg:col-span-3">
									<label for="price" class="block text-sm font-medium text-gray-700">Price</label>
									<div class="relative mt-1 rounded-md shadow-sm">
										<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<span class="text-gray-500 sm:text-sm">$</span>
										</div>
										<Field type="text" name="price" id="price" class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="0.00" />
										<div class="absolute inset-y-0 right-0 flex items-center">
											<label for="currency" class="sr-only">Currency</label>
											<Field as="select" id="currency" name="currency" class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
												<option>USD</option>
												<option>CAD</option>
												<option>EUR</option>
											</Field>
										</div>
									</div>
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
import { ref, computed } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
const props = defineProps(["hierarchy"]);
const departmentLookup = ref({});

departmentLookup.value = Object.keys(props.hierarchy);
console.log(departmentLookup.value);
// categoryLookup = hierarchy.value.data.map((department) => {
// 	Object.keys(hierarchy.value.data);
// });

const categoryLookup = computed(() => {
	return {};
});
const subCategoryLookup = ref({});
</script>
