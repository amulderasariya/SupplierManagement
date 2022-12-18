<template>
	<TransitionRoot as="template" :show="props.open">
		<Dialog as="div" class="relative z-10" @close="$emit('close', false)">
			<TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
			</TransitionChild>

			<div class="fixed inset-0 z-10 overflow-y-auto">
				<div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
						enter-to="opacity-100 translate-y-0 md:scale-100"
						leave="ease-in duration-200"
						leave-from="opacity-100 translate-y-0 md:scale-100"
						leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
					>
						<DialogPanel class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
							<div class="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
								<button type="button" class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8" @click="$emit('close', false)">
									<span class="sr-only">Close</span>
									<XMarkIcon class="h-6 w-6" aria-hidden="true" />
								</button>

								<div class="w-full items-start gap-y-8 gap-x-6">
									<h2 class="text-2xl font-bold text-gray-900 sm:pr-12">{{ props.product.name }}</h2>
									<h4 class="text-l text-gray-900 sm:pr-12">(Edit your price and stock parameters for this product listing)</h4>

									<section aria-labelledby="options-heading" class="mt-10">
										<h3 id="options-heading" class="sr-only">Product options</h3>

										<Form @submit="onSubmit" :validation-schema="schema">
											<div class="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
												<dl class="min-w-full flex justify-between border-b border-gray-200">
													<dt>Name</dt>
													<dd class="pt-4 text-right text-sm text-gray-500">{{ props.product.name }}</dd>
												</dl>
												<dl class="min-w-full flex justify-between border-b border-gray-200">
													<dt>Department</dt>
													<dd class="pt-4 text-right text-sm text-gray-500">{{ props.product.department }}</dd>
												</dl>
												<dl class="min-w-full flex justify-between border-b border-gray-200">
													<dt>Category</dt>
													<dd class="pt-4 text-right text-sm text-gray-500">{{ props.product.category }}</dd>
												</dl>
												<dl class="min-w-full flex justify-between border-b border-gray-200">
													<dt>Sub Category</dt>
													<dd class="pt-4 text-right text-sm text-gray-500">{{ props.product.subCategory }}</dd>
												</dl>
												<dl class="min-w-full flex justify-between border-b border-gray-200">
													<label for="currency" class="flex items-center"><span class="pr-2">Currency</span><PencilIcon class="h-4 w-4 cursor-pointer" /></label>
													<Field as="select" id="currency" name="currency" v-model="selectedCurrency" class="border-none pt-4 text-right text-sm text-gray-500">
														<option v-for="(currency, code) in props.currencies" :value="code">{{ currency }}</option>
													</Field>
												</dl>
												<ErrorMessage class="mt-2 text-sm text-red-600" name="currency" />
												<dl class="min-w-full flex justify-between border-b border-gray-200">
													<label for="price" class="flex items-center"><span class="pr-2">Price</span><PencilIcon class="h-4 w-4 cursor-pointer" /></label>
													<Field id="price" type="text" name="price" :value="props.product.price.toString()" class="border-none pt-4 text-right text-sm text-gray-500" />
												</dl>
												<ErrorMessage class="mt-2 text-sm text-red-600" name="price" />
												<dl class="min-w-full flex justify-between border-b border-gray-200">
													<label for="stock" class="flex items-center"><span class="pr-2">Stock</span><PencilIcon class="h-4 w-4 cursor-pointer" /></label>
													<Field id="stock" type="text" name="stock" :value="props.product.stock.toString()" class="border-none pt-4 text-right text-sm text-gray-500" />
												</dl>
												<ErrorMessage class="mt-2 text-sm text-red-600" name="stock" />
											</div>
											<button type="submit" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
												Edit Product Listing
											</button>
										</Form>
									</section>
								</div>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import { ref } from "vue";
import { Form, ErrorMessage, Field } from "vee-validate";
import * as yup from "yup";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { PencilIcon } from "@heroicons/vue/24/solid";
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();
const props = defineProps(["open", "product", "currencies"]);
const emit = defineEmits(["close", "updateProducts"]);
const selectedCurrency = ref(props.product.currency);

const schema = yup
	.object({
		currency: yup.string().required("Currency is required").oneOf(Object.keys(props.currencies), "Currency selected can only be from the currency dropdown list"),
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

const onSubmit = async (values) => {
	const product = {
		id: props.product._id,
		currency: values.currency,
		price: values.price,
		stock: values.stock,
	};

	try {
		await axios.post("/products", product);
		toast.success("Added product listing");
		emit("updateProducts");
		emit("close", false);
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};
</script>
