import React from 'react';
import { Line } from 'react-chartjs-2';

import '../styles/LineBlock.css';

const options = {
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      display: false
    }]
  },
}

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const Block = (props) => {
  return (
    <div className="block line-block">
      {/*You could have some data right here, not there, here, at Sun Labs, and you could have it beautifully visualized*/}
      <Line className="line-chart" data={data} options={options} />
    </div>
  );
}

export default Block;