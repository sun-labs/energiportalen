import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/TinyInfoBlock.css';

const ph_TimeSpan = '365d';
const ph_Key = 'PRODUCERAD ENERGI';
const ph_Value = '500';
const ph_Unit = 'MWh';

class TinyInfoBlock extends Component {
  render() {
    const { timeSpan = ph_TimeSpan, key = ph_Key, value = ph_Value, unit = ph_Unit } = this.props;

    return (
      <div className="tiny-info-block">
        <div className="header">
          <span className="timespan">{timeSpan}</span>
          <span className="key">{key}</span>
        </div>

        <div className="value-unit">
          <span className="value">{value}</span>
          <span className="unit">{unit}</span>
        </div>
      </div>
    );
  }
}

TinyInfoBlock.propTypes = {
  // TODO, currently unused component


  // timeSpan:
  // key:
  // value:
  // unit:
}

export default TinyInfoBlock;