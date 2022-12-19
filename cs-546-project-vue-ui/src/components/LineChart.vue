<template>
	<highcharts :options="chartOptions"></highcharts>
</template>

<script setup>
const props = defineProps(["data"]);

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
		accessibility: {
			rangeDescription: "Range: Number of Weeks",
		},
	},

	legend: {
		layout: "vertical",
		align: "right",
		verticalAlign: "middle",
	},

	plotOptions: {
		series: {
			label: {
				connectorAllowed: false,
			},
			pointStart: 2010,
		},
	},

	series: [
		{
			name: "Net Amount",
			data: [],
		},
		{
			name: "Gross Amount",
			data: [],
		},
	],

	// responsive: {
	// 	rules: [
	// 		{
	// 			condition: {
	// 				maxWidth: 500,
	// 			},
	// 			chartOptions: {
	// 				legend: {
	// 					layout: "horizontal",
	// 					align: "center",
	// 					verticalAlign: "bottom",
	// 				},
	// 			},
	// 		},
	// 	],
	// },
	accessibility: {
		enabled: false,
	},
};
</script>
