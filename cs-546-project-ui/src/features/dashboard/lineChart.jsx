import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales Graph',
    },
  },
};

export default function LineChart(props) {
  const { data = [] } = props;
  const graphData = {
    labels: data.map((row) => `Week ${row._id}`),
    datasets: [
      {
        label: 'Net Amount',
        data: data.map((row) => row.net_amount),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Gross Amount',
        data: data.map((row) => row.gross_amount),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Line options={options} data={graphData} />;
}
