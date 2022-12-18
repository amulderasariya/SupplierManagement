<template>
	<div class="px-4 sm:px-6 lg:px-8">
		<div class="sm:flex sm:items-center">
			<div class="sm:flex-auto mt-6">
				<h1 class="text-xl font-semibold text-gray-900">{{ props.orders.name }}</h1>
				<p class="mt-2 text-sm text-gray-700">{{ props.orders.description }}</p>
			</div>
			<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
				<JsonCSV
					:data="props.orders.data"
					class="inline-flex items-center cursor-pointer justify-center rounded-md borders borders-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
				>
					Export
				</JsonCSV>
			</div>
		</div>
		<div class="mt-8 flex flex-col">
			<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table class="min-w-full divide-y divide-gray-300">
							<thead class="bg-gray-50">
								<tr>
									<th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Invoice ID</th>
									<th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Supplier</th>
									<th scope="col" class="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-900">Gross Amount</th>
									<th scope="col" v-if="orders.name === 'Active Orders' || orders.name === 'Fulfilled Orders'" class="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-900">Net amount</th>
									<th scope="col" v-if="orders.name === 'Active Orders' || orders.name === 'Fulfilled Orders'" class="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-900">Amount Paid</th>
									<th scope="col" v-if="orders.name === 'Active Orders' || orders.name === 'Fulfilled Orders'" class="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-900">Payment</th>
									<th scope="col" v-if="orders.name === 'Active Orders' || orders.name === 'Fulfilled Orders'" class="whitespace-nowrap px-2 py-2 text-left text-sm font-semibold text-gray-900">Due</th>
									<th scope="col" v-if="orders.name === 'Fulfilled Orders'" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Delivered</th>

									<th scope="col" v-if="orders.name === 'Pending Orders'" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
										<span class="sr-only">Approve</span>
									</th>
									<th scope="col" v-if="orders.name === 'Pending Orders'" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
										<span class="sr-only">Reject</span>
									</th>
									<th scope="col" v-if="orders.name === 'Active Orders'" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
										<span class="sr-only">Mark Fullfilled</span>
									</th>
									<th scope="col" v-if="orders.name === 'Fulfilled Orders'" class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6">
										<span class="sr-only">Rate</span>
									</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white" v-if="props.orders.data">
								<tr v-for="transaction in props.orders.data" :key="transaction._id">
									<td class="whitespace-nowrap py-2 pl-6 pr-3 font-medium text-sm text-gray-900">{{ transaction._id }}</td>
									<td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ transaction.supplierName }}</td>
									<td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{{ grossAmountFilter(transaction) }}</td>
									<td v-if="orders.name === 'Active Orders' || orders.name === 'Fulfilled Orders'" class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ netAmountFilter(transaction) }}</td>
									<td v-if="orders.name === 'Active Orders' || orders.name === 'Fulfilled Orders'" class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ paidAmountFilter(transaction) }}</td>
									<td v-if="orders.name === 'Active Orders' || orders.name === 'Fulfilled Orders'" class="whitespace-nowrap py-2 pl-2 pr-3 font-medium text-sm text-gray-900">{{ transaction.paymentStatus }}</td>
									<td v-if="orders.name === 'Active Orders' || orders.name === 'Fulfilled Orders'" class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ dateFilter(transaction.due_date) }}</td>
									<td v-if="orders.name === 'Fulfilled Orders'" class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ dateFilter(transaction.deliveredDate) }}</td>
									<!-- <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.price }}</td>
									<td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.quantity }}</td>
									<td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.netAmount }}</td> -->
									<td v-if="orders.name === 'Pending Orders'" class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
										<button type="button" @click="open = true" class="inline-flex items-center rounded-md border border-transparent bg-green-600 px-2 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
											Approve
										</button>
									</td>
									<td v-if="orders.name === 'Pending Orders'" class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
										<button type="button" @click="open = true" class="inline-flex items-center rounded-md border border-transparent bg-red-600 px-2 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
											Reject
										</button>
									</td>
									<td v-if="orders.name === 'Active Orders'" class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
										<button
											type="button"
											@click="open = true"
											class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											Settle Payment
										</button>
									</td>
									<td v-if="orders.name === 'Fulfilled Orders'" class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
										<button
											type="button"
											@click="open = true"
											class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-2 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											Rate
											<StarIcon class="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
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
	<ProductModal :open="open" @close="open = false" />
</template>

<script setup>
import { ref } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";
import ProductModal from "./ProductModal.vue";
import JsonCSV from "vue-json-csv";

let open = ref(false);
const props = defineProps(["orders"]);

const grossAmountFilter = (invoice) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: invoice.currency,
	});
	return formatter.format(invoice.gross_amount);
};

const netAmountFilter = (invoice) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: invoice.currency,
	});
	return formatter.format(invoice.net_amount);
};

const paidAmountFilter = (invoice) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: invoice.currency,
	});
	return formatter.format(invoice.paidAmount);
};

const dateFilter = (date) => {
	const newDate = new Date(date);
	return (newDate.getMonth() > 8 ? newDate.getMonth() + 1 : "0" + (newDate.getMonth() + 1)) + "/" + (newDate.getDate() > 9 ? newDate.getDate() : "0" + newDate.getDate()) + "/" + newDate.getFullYear();
};
</script>
