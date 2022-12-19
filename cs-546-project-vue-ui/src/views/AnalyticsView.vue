<template>
	<div class="px-4 sm:px-6 lg:px-8">
		<div class="bg-white shadow sm:rounded-lg mt-2">
			<div class="px-4 py-5 sm:p-6">
				<div class="sm:flex sm:items-start sm:justify-between">
					<div>
						<label for="fromDate" class="block text-sm font-medium text-gray-700 pl-3">From Date</label>
						<Datepicker id="fromDate" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" v-model="fromDate" :enable-time-picker="false"></Datepicker>
					</div>

					<div>
						<label for="toDate" class="block text-sm font-medium text-gray-700 pl-3">To Date</label>
						<Datepicker id="toDate" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" v-model="toDate" :enable-time-picker="false"></Datepicker>
					</div>

					<div>
						<label for="groupBy" class="block text-sm font-medium text-gray-700">Group By</label>
						<select id="groupBy" name="groupBy" v-model="groupBy" class="mt-3 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
							<option value="department">Department</option>
							<option value="category">Category</option>
							<option value="subCategory">Sub Category</option>
						</select>
					</div>

					<div class="mt-6 items-center">
						<button type="button" @click="refresh" class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">Refresh</button>
					</div>
				</div>
			</div>
		</div>
		<div v-if="!refreshGraph" class="pt-4 rounded-lg">
			<LineChart :data="lineGraphData.data" />
		</div>
		<div v-if="!refreshGraph" class="pt-4 rounded-lg">
			<BarChart :data="barGraphData.data" />
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import LineChart from "../components/LineChart.vue";
import BarChart from "../components/BarChart.vue";

const toast = useToast();
const refreshGraph = ref(false);

const fromDate = ref(new Date());
const toDate = ref(new Date());
const groupBy = ref("department");
const lineGraphData = ref();
const barGraphData = ref();

const refresh = async () => {
	try {
		refreshGraph.value = true;
		lineGraphData.value = await axios.get("/dashboard/sales", {
			params: {
				startDate: fromDate.value,
				endDate: toDate.value,
			},
		});
		barGraphData.value = await axios.get("/dashboard/group", {
			params: {
				startDate: fromDate.value,
				endDate: toDate.value,
				groupBy: groupBy.value,
			},
		});
		refreshGraph.value = false;
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};

await refresh();
</script>
