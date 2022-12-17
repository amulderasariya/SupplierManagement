<template>
	<div class="px-4 sm:px-6 lg:px-8">
		<div class="block">
			<nav class="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Order Tabs">
				<button
					v-for="(tab, tabIdx) in tabs"
					:key="tab.name"
					@click="changeCurrentTab(tab)"
					:class="[
						tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
						tabIdx === 0 ? 'rounded-l-lg' : '',
						tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
						'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
					]"
					:aria-current="tab.current ? 'page' : undefined"
				>
					<span>{{ tab.name }}</span>
					<span aria-hidden="true" :class="[tab.current ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
				</button>
			</nav>
		</div>
	</div>
	<TransactionTable :orders="transactions()" />
</template>

<script setup>
import { reactive } from "vue";
import TransactionTable from "../components/TransactionTable.vue";

const pendingTransactions = [
	{
		id: "AAPS0L",
		company: "Chase & Co.",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Chase & Co.",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Chase & Co.",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Chase & Co.",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
];

const activeTransactions = [
	{
		id: "AAPS0L",
		company: "Active",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Active",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Active",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Active",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
];

const fulfilledTransactions = [
	{
		id: "AAPS0L",
		company: "Fulfilled",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Fulfilled",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Fulfilled",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Fulfilled",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
];

const cancelledTransactions = [
	{
		id: "AAPS0L",
		company: "Cancelled",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Cancelled",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Cancelled",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
	{
		id: "AAPS0L",
		company: "Cancelled",
		share: "CAC",
		commission: "+$4.37",
		price: "$3,509.00",
		quantity: "12.00",
		netAmount: "$4,397.00",
	},
];

const tabs = reactive([
	{ name: "Pending Orders", description: "A table of placeholder pending orders data that does not make any sense.", current: true, data: pendingTransactions },
	{ name: "Active Orders", description: "A table of placeholder active orders data that does not make any sense.", current: false, data: activeTransactions },
	{ name: "Fulfilled Orders", description: "A table of placeholder fulfilled orders data that does not make any sense.", current: false, data: fulfilledTransactions },
	{ name: "Cancelled Orders", description: "A table of placeholder cancelled orders data that does not make any sense.", current: false, data: cancelledTransactions },
]);

const changeCurrentTab = (item) => {
	for (let i = 0; i < tabs.length; i++) {
		if (tabs[i].current) tabs[i].current = false;
		if (tabs[i].name === item.name) tabs[i].current = true;
	}
};

const transactions = () => {
	for (let i = 0; i < tabs.length; i++) {
		if (tabs[i].current) return tabs[i];
	}
};
</script>
