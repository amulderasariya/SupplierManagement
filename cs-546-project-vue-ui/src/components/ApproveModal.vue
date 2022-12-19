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
									<h2 class="text-l text-gray-900 pb-6 pr-12">Choose the quantity value you want to approve for this invoice</h2>
									<table class="min-w-full divide-y divide-gray-300">
										<thead>
											<tr>
												<th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0">Products ID</th>
												<th scope="col" class="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell">Product Name</th>
												<th scope="col" class="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell">
													<div class="flex justify-end">Quantity <PencilIcon class="ml-2 h-4 w-4 cursor-pointer" /></div>
												</th>
												<th scope="col" class="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">Price</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="product in products" :key="product._id" class="border-b border-gray-200">
												<td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
													<div class="font-medium text-gray-900">{{ product.productID }}</div>
												</td>
												<td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
													<div class="font-medium text-gray-900">{{ product.productName }}</div>
												</td>
												<td class="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
													<label for="stock" class="sr-only">{{ product.stock }}</label>
													<input id="stock" type="text" name="stock" v-model="product.quantity" class="border-none pt-2 text-right text-sm text-gray-500" />
												</td>
												<td class="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">{{ currencyFilter(product.price) }}</td>
											</tr>
										</tbody>
									</table>
									<div class="min-w-full flex justify-between pt-4">
										<label for="dueDate" class="flex items-center"><span class="pr-2">Due Date</span><PencilIcon class="h-4 w-4 cursor-pointer" /></label>
										<Datepicker id="dueDate" class="border-none" v-model="date" :enable-time-picker="false" :min-date="new Date()"></Datepicker>
									</div>

									<div class="min-w-full flex justify-between border-b border-gray-200 pt-4">
										<label for="netAmount" class="flex items-center"><span class="pr-2">Net Amount</span><PencilIcon class="h-4 w-4 cursor-pointer" /></label>
										<input id="netAmount" type="text" name="netAmount" v-model="netAmount" class="text-right text-sm text-gray-500" />
									</div>
									<div class="min-w-full flex justify-between border-b border-gray-200 pt-4">
										<label for="paidAmount" class="flex items-center"><span class="pr-2">Paid Amount</span><PencilIcon class="h-4 w-4 cursor-pointer" /></label>
										<input id="paidAmount" type="text" name="paidAmount" v-model="paidAmount" class="text-right text-sm text-gray-500" />
									</div>

									<button type="submit" @click="onSubmit" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
										Approve Invoice
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
import { ref, computed } from "vue";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { PencilIcon } from "@heroicons/vue/24/solid";
import { useToast } from "vue-toastification";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const props = defineProps(["open", "products", "currency", "invoiceID"]);
const emit = defineEmits(["close"]);
const products = ref(props.products);
const date = ref(new Date());
const paidAmount = ref(null);
const netAmount = ref(null);
console.log(products.value);

const onSubmit = async () => {
	// const invoice = {
	// 	supplierID: props.selectedSupplier._id,
	// 	invoiceProducts: [],
	// 	currency: selectedCurrency.value,
	// };

	// products.value.map((product) => {
	// 	order.invoiceProducts.push({
	// 		productID: product._id,
	// 		quantity: product.stock,
	// 	});
	// });
	console.log(date.value);

	try {
		await axios.post(`/invoice/${props.invoiceID}/approve`, {
			due_date: date.value,
			paidAmount: Number(paidAmount.value),
			net_amount: Number(netAmount.value),
		});
		toast.success("Invoice Approved!");
		router.push("/dashboard/orders");
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};

const currencyFilter = (price) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: props.currency,
	});
	return formatter.format(price);
};
</script>
