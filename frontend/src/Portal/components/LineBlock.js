import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { defaultConfig, defaultOptions } from '../defaultChartConfigs.js';
import PropTypes from 'prop-types';
import Block from './Block';

class LineBlock extends Component {

  componentWillMount() {
    const { props } = this;

    // TODO new way of doing this
    if (typeof props.locationId === 'number') {
      props.fetchLocationData(props);
    } else if (props.refresh === true) {
      props.fetchData(props);
    }
  }

  setArrayLengths(datasets, labels) {

    const max = datasets.length > 0 ? datasets.reduce((acc, val) => {
      if (acc.data.length > val.data.length) {
        return acc;
      } else {
        return val;
      }
    }).data.length : -1;

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

    const { props } = this;

    const {
      options = defaultOptions,
      config = defaultConfig,
      data = [],
      labels = [],
      timeSpan,
      title,
      dataKey,
      editing,
      blockId = null
    } = props;

    const datasets = this.setArrayLengths(
      this.setDataColors(data, config),
      labels
    );

    const blockInfo = {
      title,
      subtitle: dataKey,
      timeSpan,
      type: 'LINE',
      editing,
      blockId,
      ...props
    }

    return (
      <Block className="blockk-line" { ...blockInfo }>
        <Line className="line-chart" data={datasets} options={options} />
      </Block>
    );

  }
}

LineBlock.propTypes = {
  fetchData:            PropTypes.func.isRequired,
  fetchLocationData:    PropTypes.func.isRequired,
  locationId:           PropTypes.number.isRequired,
  refresh:              PropTypes.bool.isRequired,
  data:                 PropTypes.array.isRequired,
  labels:               PropTypes.array.isRequired,
  timeSpan:             PropTypes.string.isRequired,
  title:                PropTypes.string.isRequired,
  dataKey:              PropTypes.string.isRequired,
  editing:              PropTypes.bool.isRequired,
  blockId:              PropTypes.number.isRequired,

  options:              PropTypes.object,
  config:               PropTypes.object,
};

export default LineBlock;