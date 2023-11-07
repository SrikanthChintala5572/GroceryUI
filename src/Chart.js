import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
    const chartData = {
        labels: props.date,
        datasets: [
          {
            label: 'Price vs Year',
            data: props.price,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.2,
          },
        ],
      };

  return (
    <div className="chart-container">
      <Line data={chartData}/>
    </div>
  );
};

export default LineChart;