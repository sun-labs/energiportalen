import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

import API from '../../API';
import Block from './Block';

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
  data: []
}

const data2 = {
  label: 'bar',
  data: []
}

const ph_Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const ph_Title = 'TITLE';
// const ph_Name = 'NAME';
const ph_TimeSpan = '24h';

// NOTE data sent to block must be a list with lists of data
// aka [[1, 2, 3, 4], [1, 2, 3, 4, 6]]
// const LineBlock = ({ options = defaultOptions, data = [datas[0]], labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'] }) => {
// const LineBlock = ({ options = defaultOptions, data = [defaultData[0]], labels = defaultLabels }) => {
class LineBlock extends Component {

  constructor() {
    super();
    this.state = {
      data: [data1, data2],
      title: 'Akademiska Sjukhuset',
      dataKey: 'Energy produced',
      labels: ph_Labels,
      from: '2017-02-10',
      to: '2017-02-10 23:59:59',
      interval: 'hour',
      unitId: 4,
      keyId: 95,
      refresh: true
    };
    this.updateBlock = this.updateBlock.bind(this);
    this.getBlock = this.getBlock.bind(this);
  }

  updateBlock(params) {
    console.log(params);
    this.setState(params);
  }

  getBlock() {
    return this.state;
  }

  componentWillMount() {
    console.log('mounting yo');
    if(this.state.refresh === true) {
      this.setState({
        ...this.props,
        value: 'loading..'
      }, () => {
        this.fetchData((data) => {
          const values = data.data.map((elem) => {
            return elem.sum_val.toFixed(0);
          });
          const labels = data.data.map((elem) => {
            return elem.new_timestamp;
          });
          this.setState({
            ...this.state,
            data: [{
              data: values,
              label: this.state.title
            }, {
              data: values.map((elem) => {
                return parseInt(elem, 10) + Math.random() * 50;
              }),
              label: 'Random Akkis'
            }],
            labels: labels,
            value: data.data[0].sum_val.toFixed(0)
          })
        });
      });
    }
  }

  fetchData(cb) {
    API.getDataFromKey(this.state, (res) => {
      cb(res.data);
    });
  }

  setArrayLengths(datasets, labels) {

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

setDataColors(dataList, config) {

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


  render() {

    console.log('rendering line');

    const props = this.props;

    const {
      options = defaultOptions, 
      data = this.state.data, 
      labels = this.state.labels,
      // title = ph_Title,
      // subtitle = ph_Name,
      timeSpan = ph_TimeSpan
    } = props;

    const datasets = this.setArrayLengths(
      this.setDataColors(data, defaultConfig), 
      labels
    );

    const blockInfo = {
      title: this.state.title,
      subtitle: this.state.dataKey,
      timeSpan,
      type: 'LINE',
      updateBlock: this.updateBlock,
      getBlock: this.getBlock
    }

    return (
      <Block className="blockk-line" { ...blockInfo }>
        <Line className="line-chart" data={datasets} options={options} />
      </Block>
    );

  }
}

export default LineBlock;