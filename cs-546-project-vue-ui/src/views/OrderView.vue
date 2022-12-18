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
import { useToast } from "vue-toastification";
import axios from "axios";

const toast = useToast();

const tabs = reactive([
	{ name: "Pending Orders", description: "A table of placeholder pending orders data that does not make any sense.", current: true, data: [] },
	{ name: "Active Orders", description: "A table of placeholder active orders data that does not make any sense.", current: false, data: [] },
	{ name: "Fulfilled Orders", description: "A table of placeholder fulfilled orders data that does not make any sense.", current: false, data: [] },
	{ name: "Cancelled Orders", description: "A table of placeholder cancelled orders data that does not make any sense.", current: false, data: [] },
]);

try {
	const { data } = await axios.get("/invoice");
	console.log(data);
	tabs[0].data = data.PENDING;
	tabs[1].data = data.APPROVED;
	tabs[2].data = data.COMPLETED;
	tabs[3].data = data.REJECTED;
} catch (e) {
	e.response.data.errors.forEach((error) => {
		toast.error(error.msg);
	});
}

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
