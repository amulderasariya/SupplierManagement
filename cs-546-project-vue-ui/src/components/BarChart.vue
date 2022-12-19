<template>
	<highcharts :options="chartOptions"></highcharts>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["data"]);

const gross_amount = ref(
	props.data[0].map((item) => {
		return item.gross_amount;
	})
);

const categories = ref(
	props.data[0].map((item) => {
		return item._id;
	})
);

const gross_amount1 = ref(
	props.data[1].map((item) => {
		return item.gross_amount;
	})
);

console.log(categories.value);

const chartOptions = {
	chart: {
		type: "column",
	},
	title: {
		text: "Group By Department, Category & Sub Category",
	},
	xAxis: {
		categories: categories.value,
		crosshair: true,
	},
	yAxis: {
		min: 0,
		title: {
			text: "Sales Amount",
		},
	},
	plotOptions: {
		column: {
			pointPadding: 0.2,
			borderWidth: 0,
		},
	},
	series: [
		{
			name: "Current Year",
			data: gross_amount.value,
		},
		{
			name: "Previous Year",
			data: gross_amount1.value,
		},
	],
	accessibility: {
		enabled: false,
	},
};
</script>
