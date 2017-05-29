import React, { Component } from 'react';

import IlluBlock from './IlluBlock';
import API from '../../API.js';

class IlluPhoneBlock extends Component {

  constructor() {
    super();
    this.state = {
      value: 100,
      title: 'Akademiska Sjukhuset',
      subtitle: 'Uppsala',
      timeSpan: '24h',
      from: '2017-02-10',
      to: '2017-02-10 23:59:59',
      interval: 'hour',
      unitId: 4,
      keyId: 95,
      refresh: true
    };
  }

  componentWillMount() {
    this.setState({
      ...this.props,
      value: -1
    }, () => {
      this.fetchData((data) => {
        this.setState({
          ...this.state,
          value: data.data[0].sum_val
        })
      });
    });
  }

  fetchData(cb) {
    API.getDataFromKey(this.state, (res) => {
      cb(res.data);
    });
  }

  /**
   * @param {Int} energy in Wh
   */
  calcCharged(energy) {
    const {
      BAT_SIZE_MAH = 3000,
      CHARGER_CUR_V = 5
    } = {};
    const Wh = BAT_SIZE_MAH * CHARGER_CUR_V / 1000;
    const charges = energy / Wh;
    return Math.floor(charges);
  }

  render() {

    const { value = 100 } = this.state;

    return(
    <IlluBlock className="block-phone" title={ this.state.title } subtitle={ this.state.subtitle } timeSpan={ this.state.timeSpan }>
        <p className="value-illu">{ this.calcCharged(value) }</p>
        <figure className="charge"></figure>
        <figure className="phone"></figure>
        <figure className="cable"></figure>
    </IlluBlock>
    );
  }
}

export default IlluPhoneBlock;