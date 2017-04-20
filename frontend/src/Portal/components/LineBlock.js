import React from 'react';
import { Line } from 'react-chartjs-2';

import '../styles/LineBlock.css';

let datasets = {
  fill: false,
  lineTension: 0.1,
  backgroundColor: '#4bc0c0',
  borderColor: '#4bc0c0',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: '#4bc0c0',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: '#4bc0c0',
  pointHoverBorderColor: '#dcdcdc',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  data: []
};

let op = {
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      display: false
    }]
  },
}

const Block = ({ options = op, data = [65, 59, 80, 81, 56, 55, 40], labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'] }) => {
  // TODO make sure labels & data have the same length

  return (
    <div className="block line-block">
      {/*You could have some data right here, not there, here, at Sun Labs, and you could have it beautifully visualized*/}
      <Line className="line-chart" data={{ labels, datasets: [{ ...datasets, data}] }} options={options} />
    </div>
  );
}

export default Block;