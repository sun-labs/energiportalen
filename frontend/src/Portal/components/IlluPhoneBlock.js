import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from '../../Splash/assets/APIRoutes.js';
import IlluBlock from './IlluBlock';

class IlluPhoneBlock extends Component {

  constructor() {
    super();
    this.state = {
      value: 100,
      title: 'Akademiska Sjukhuset',
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
    const token = localStorage.getItem('token');
    const PARAM_FROM = 'date[from]'; // this will send a javascript object to backend like: date { from: data }
    const PARAM_TO = 'date[to]';
    const PARAM_INT = 'interval';
    const {
      from,
      to,
      interval
    } = this.state;
    const PARAMETERS = `${PARAM_FROM}=${from}&${PARAM_TO}=${to}&${PARAM_INT}=${interval}`;
    axios.get(`${API_URL}/units/${this.state.unitId}/${this.state.keyId}?${PARAMETERS}`, {
      headers: {
        Authorization: token
      }
    }).then((res) => {
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
    <IlluBlock className="block-phone">
        <p className="value-illu">{ this.calcCharged(value) }</p>
        <figure className="charge"></figure>
        <figure className="phone"></figure>
        <figure className="cable"></figure>
    </IlluBlock>
    );
  }
}

export default IlluPhoneBlock;