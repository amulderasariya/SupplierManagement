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
		<CreateProductTable v-if="tabs[0].current" :currencies="currencies.data" />
		<CreateProductForm v-if="tabs[1].current" :hierarchy="hierarchy.data" :currencies="currencies.data" />
	</div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useToast } from "vue-toastification";
import axios from "axios";
import CreateProductForm from "../components/CreateProductForm.vue";
import CreateProductTable from "../components/CreateProductTable.vue";

const hierarchy = ref({});
const currencies = ref([]);
const toast = useToast();

try {
	hierarchy.value = await axios.get("/lookup/hierarchy");
	currencies.value = await axios.get("/lookup/currencies");
} catch (e) {
	toast.error(e.response.data.message);
}

const tabs = reactive([
	{ name: "All your existing product", current: true },
	{ name: "Create new product for listing", current: false },
]);

const changeCurrentTab = (item) => {
	for (let i = 0; i < tabs.length; i++) {
		if (tabs[i].current) tabs[i].current = false;
		if (tabs[i].name === item.name) tabs[i].current = true;
	}
};
</script>
