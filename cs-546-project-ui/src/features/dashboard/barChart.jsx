import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Group by',
    },
  },
};

export function BarChart(props) {
  const { data = [] } = props;

  const columns = {};

  data[0].forEach((row) => {
    if (columns[row._id] === undefined) columns[row._id] = {};
    columns[row._id].prev = row.gross_amount;
  });
  data[1].forEach((row) => {
    if (columns[row._id] === undefined) columns[row._id] = {};
    columns[row._id].curr = row.gross_amount;
  });
  const graphData = {
    labels: Object.keys(columns),
    datasets: [
      {
        label: 'Previous Year',
        data: Object.keys(columns).map((column) => columns[column].prev),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Current Year',
        data: Object.keys(columns).map((column) => columns[column].curr),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={graphData} />;
}
