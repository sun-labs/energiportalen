import React from 'react';
import { Line } from 'react-chartjs-2';

import '../styles/LineBlock.css';

let defaultOptions = {
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      display: false
    }]
  },
}

const defaultConfig = {
  type: 'line',
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
  pointHitRadius: 10
};

const data1 = {
  label: 'foo',
  data: [65, 59, 80, 81, 56, 55]
}

const data2 = {
  label: 'bar',
  data: [35, 49, 70, 31, 27, 83, 123, 27, 83]
}

const data3 = {
  label: 'baz',
  data: [25, 59, 40, 15, 100]
}

const ph_Data = [data1, data2, data3];

const ph_Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const ph_Title = 'TITLE';
const ph_Location = 'LOCATION';
const ph_TimeSpan = '24h';

const setArrayLengths = (datasets, labels) => {

  const max = datasets.reduce((acc, val) => {
    if (acc.data.length > val.data.length) {
      return acc;
    } else {
      return val;
    }
  }).data.length;

  if (max < labels.length) {
    return { 
      datasets,
      labels: labels.slice(0, max)
    };
  }
  else if (max > labels.length) {
    return {
      labels,
      datasets: datasets.map(item => ({
        ...item,
        data: item.data.slice(0, labels.length)
      }))
    };
  }

  return { 
    labels, 
    datasets
  };
}

const setDataColors = (dataList, config) => {

  // NOTE, make sure we have more colors than datasets
  const colors = ['#4bc0c0', '#F2C94C', '#EB5757'];

  return dataList.map((item, index) => {
    return {
      ...item, 
      ...config,
      backgroundColor: colors[index],
      borderColor: colors[index],
      pointBorderColor: colors[index],
      pointHoverBackgroundColor: colors[index]
    }
  });
}

// NOTE data sent to block must be a list with lists of data
// aka [[1, 2, 3, 4], [1, 2, 3, 4, 6]]
// const LineBlock = ({ options = defaultOptions, data = [datas[0]], labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'] }) => {
// const LineBlock = ({ options = defaultOptions, data = [defaultData[0]], labels = defaultLabels }) => {
const LineBlock = (props) => {

  const {
    options = defaultOptions, 
    data = [ph_Data[0]], 
    labels = ph_Labels,
    title = ph_Title,
    location = ph_Location,
    timeSpan = ph_TimeSpan
  } = props;

  const datasets = setArrayLengths(
    setDataColors(data, defaultConfig), 
    labels
  );

  return (
    <div className="block line-block">
      {/*You could have some data right here, not there, here, at Sun Labs, and you could have it beautifully visualized*/}

      <div className="header">
        <span className="time-span">{timeSpan}</span>

        <span className="title-location">
          <h3 className="title">{title}</h3>
          <p className="location">{location}</p>
        </span>
        
        <span className="edit">EDIT</span>
      </div>
      <div className="chart">
        <Line className="line-chart" data={datasets} options={options} />        
      </div>
    </div>
  );
}

export default LineBlock;