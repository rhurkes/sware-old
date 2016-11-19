import React from 'react';
import { Line as LineChart } from 'react-chartjs';

const data = {
  labels: ['18:36', '37', '38', '39', '18:40', '41', '42', '43'],
  datasets: [
    {
      fillColor: 'rgba(220,220,220,0.2)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: [
        0, 2, 2, 2, 2, 1, 2, 2
      ]
    }
  ]
};

const options = {
  animation: false,
  scaleLabel: (label) => {
    const { value } = label;
    if (value > 1.5) return 'good';
    if (value >= 1) return 'poor';
    return 'bad';
  }
};

const Chart = () => (
  <LineChart data={data} options={options} width="300" height="100" />
);

export default Chart;
