import React from 'react';
import { Line } from 'react-chartjs-2';

const AbsenceChart = ({ data }) => {
  // Extract the absence hours data for each day
  const { lundi, mardi, mercredi, jeudi, vendredi } = data.globalAbsence;

  // Define the chart data and options
  const chartData = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    datasets: [
      {
        label: 'Absence Student',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: [lundi, mardi, mercredi, jeudi, vendredi],
      },
     
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default AbsenceChart;
