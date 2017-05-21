import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from '../../Splash/assets/APIRoutes.js';
import IlluBlock from './IlluBlock';

class IlluScooterBlock extends Component {

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
  calcTurnsAroundEarth(energy) {
    energy = energy / 1000; // to kWh
    const {
      SC_DISTANCE_KM = 40,
      SC_BATTERY_KWH = 1.1,
      EARTH_CIRC_KM = 40075
    } = {};
    const scooterDistance = ((energy/SC_BATTERY_KWH)*SC_DISTANCE_KM);
    const turns = scooterDistance/EARTH_CIRC_KM;
    return turns;
  }

  render() {

    const { value = 100 } = this.state;
    return(
    <IlluBlock className="block-scooter">
        <p className="value-illu">{ this.calcTurnsAroundEarth(value).toFixed(2) }</p>
        <figure className="scooter"></figure>
        <figure className="earth"></figure>
    </IlluBlock>
    );
  }
}

export default IlluScooterBlock;