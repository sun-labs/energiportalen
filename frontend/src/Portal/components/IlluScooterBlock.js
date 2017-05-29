import React, { Component } from 'react';

import API from '../../API';
import IlluBlock from './IlluBlock';

class IlluScooterBlock extends Component {

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
    <IlluBlock className="block-scooter" title={ this.state.title } subtitle={ this.state.subtitle } timeSpan={ this.state.timeSpan }>
        <p className="value-illu">{ this.calcTurnsAroundEarth(value).toFixed(2) }</p>
        <figure className="scooter"></figure>
        <figure className="earth"></figure>
    </IlluBlock>
    );
  }
}

export default IlluScooterBlock;