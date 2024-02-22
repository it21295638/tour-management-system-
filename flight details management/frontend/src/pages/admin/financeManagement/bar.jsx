import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/finance/all');
      const json = await response.json();
      setData(json);
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.map((item) => item.type),
    datasets: [
      {
        label: 'Amount',
        data: data.map((item) => parseFloat(item.amount)),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
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

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
