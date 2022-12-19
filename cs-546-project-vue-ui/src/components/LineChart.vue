<template>
	<highcharts :options="chartOptions"></highcharts>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["data"]);
const net_amount = ref(
	props.data.map((item) => {
		return item.net_amount;
	})
);
const gross_amount = ref(
	props.data.map((item) => {
		return item.gross_amount;
	})
);
const categories = ref(
	props.data.map((item) => {
		return "Week " + item._id;
	})
);

const chartOptions = {
	title: {
		text: "Sales Graph",
	},

	yAxis: {
		title: {
			text: "Total Sales Amount",
		},
	},

	xAxis: {
		title: {
			text: "Total Weeks in year",
		},
		categories: categories.value,
		accessibility: {
			rangeDescription: "Range: Number of Weeks",
		},
	},

	legend: {
		layout: "vertical",
		align: "right",
		verticalAlign: "middle",
	},

	// plotOptions: {
	// 	series: {
	// 		label: {
	// 			connectorAllowed: false,
	// 		},
	// 		pointStart: 2010,
	// 	},
	// },

	series: [
		{
			name: "Net Amount",
			data: net_amount.value,
		},
		{
			name: "Gross Amount",
			data: gross_amount.value,
		},
	],
	accessibility: {
		enabled: false,
	},
};
</script>
