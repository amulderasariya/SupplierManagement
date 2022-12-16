<template>
	<highcharts :options="chartOptions"></highcharts>
</template>

<script setup>
const chartOptions = {
	title: {
		text: "Sales of petroleum products March, Norway",
		align: "left",
	},
	xAxis: {
		categories: ["Jet fuel", "Duty-free diesel", "Petrol", "Diesel", "Gas oil"],
	},
	yAxis: {
		title: {
			text: "Million liters",
		},
	},
	tooltip: {
		valueSuffix: " million liters",
	},
	series: [
		{
			type: "column",
			name: "2020",
			data: [59, 83, 65, 228, 184],
		},
		{
			type: "column",
			name: "2021",
			data: [24, 79, 72, 240, 167],
		},
		{
			type: "column",
			name: "2022",
			data: [58, 88, 75, 250, 176],
		},
		{
			type: "spline",
			name: "Average",
			data: [47, 83.33, 70.66, 239.33, 175.66],
			marker: {
				lineWidth: 2,
				lineColor: "black",
				fillColor: "white",
			},
		},
		{
			type: "pie",
			name: "Total",
			data: [
				{
					name: "2020",
					y: 619,
					color: "red", // 2020 color
					dataLabels: {
						enabled: true,
						distance: -50,
						format: "{point.total} M",
						style: {
							fontSize: "15px",
						},
					},
				},
				{
					name: "2021",
					y: 586,
					color: "green", // 2021 color
				},
				{
					name: "2022",
					y: 647,
					color: "purple", // 2022 color
				},
			],
			center: [75, 65],
			size: 100,
			innerSize: "70%",
			showInLegend: false,
			dataLabels: {
				enabled: false,
			},
		},
	],
	accessibility: {
		enabled: false,
	},
};
</script>
