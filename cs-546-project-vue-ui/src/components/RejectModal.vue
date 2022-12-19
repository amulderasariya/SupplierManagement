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

								<div class="w-full -mx-4 mt-2 flex flex-col sm:-mx-6 md:mx-0">
									<h2 class="text-l text-gray-900 pb-6 pr-12">Choose the stock value you require for each product listing</h2>
									<table class="min-w-full divide-y divide-gray-300">
										<thead>
											<tr>
												<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Products</th>
												<th scope="col" class="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell">Stock</th>
												<th scope="col" class="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell">Unit Price</th>
												<th scope="col" class="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">Total Price</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="product in products" :key="product._id" class="border-b border-gray-200">
												<td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
													<div class="font-medium text-gray-900">{{ product.name }}</div>
												</td>
												<td class="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
													<label for="stock" class="sr-only">{{ product.stock }}</label>
													<input id="stock" type="text" name="stock" v-model="product.stock" class="border-none pt-2 text-right text-sm text-gray-500" />
												</td>
												<td class="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
													{{ currencyFilter(product) }}
												</td>
												<td class="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">{{ totalCurrencyFilter(product) }}</td>
											</tr>
										</tbody>
										<tfoot>
											<!-- <tr>
												<th scope="row" colspan="3" class="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0">Subtotal</th>
												<th scope="row" class="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Subtotal</th>
												<td class="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">$3,900.00</td>
											</tr>
											<tr>
												<th scope="row" colspan="3" class="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0">Tax</th>
												<th scope="row" class="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Tax</th>
												<td class="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">$585.00</td>
											</tr> -->
											<!-- <tr>
												<th scope="row" colspan="3" class="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0">Total</th>
												<th scope="row" class="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total</th>
												<td class="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">{{ computedTotal() }}</td>
											</tr> -->
										</tfoot>
									</table>
									<div class="min-w-full flex justify-between border-b border-gray-200 pt-4">
										<label for="currency" class="flex items-center"><span class="pr-2">Currency</span><PencilIcon class="h-4 w-4 cursor-pointer" /></label>
										<select id="currency" name="currency" v-model="selectedCurrency" class="border-none pt-4 text-right text-sm text-gray-500">
											<option v-for="(currency, code) in props.currencies" :value="code">{{ currency }}</option>
										</select>
									</div>
									<button type="submit" @click="onSubmit" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
										Confirm Place Order
									</button>
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
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { PencilIcon } from "@heroicons/vue/24/solid";
import { useToast } from "vue-toastification";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const props = defineProps(["open", "products", "currencies", "selectedSupplier"]);
const emit = defineEmits(["close"]);
const selectedCurrency = ref("USD");
const products = ref(props.products);

const onSubmit = async () => {
	const order = {
		supplierID: props.selectedSupplier._id,
		invoiceProducts: [],
		currency: selectedCurrency.value,
	};

	products.value.map((product) => {
		order.invoiceProducts.push({
			productID: product._id,
			quantity: product.stock,
		});
	});

	try {
		await axios.post("/invoice", order);
		toast.success("Invoice Created!");
		router.push("/dashboard/orders");
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};

const totalCurrencyFilter = (product) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: product.currency,
	});
	return formatter.format(product.price * product.stock);
};

const currencyFilter = (product) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: product.currency,
	});
	return formatter.format(product.price);
};
</script>
