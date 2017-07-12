import React, { Component } from 'react';
import IlluBlock from './IlluBlock';
import PropTypes from 'prop-types';

class IlluScooterBlock extends Component {

  constructor() {
    super();

    this.calcTurnsAroundEarth = this.calcTurnsAroundEarth.bind(this);
  }

  componentWillMount() {
    const { props } = this;
    props.fetchSumValueData(props);
  }

  /**
   * @param {Int} energy in Wh
   */
  calcTurnsAroundEarth(energy) {
    energy /= 1000; // to kWh
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

    const { props, calcTurnsAroundEarth } = this;

    return(
    <IlluBlock className="block-scooter" title={ props.title } subtitle={ props.subtitle } timeSpan={ props.timeSpan }>
        <p className="value-illu">{ calcTurnsAroundEarth(props.value).toFixed(2) }</p>
        <figure className="scooter"></figure>
        <figure className="earth"></figure>
    </IlluBlock>
    );
  }
}

IlluScooterBlock.propTypes = {
  value:                PropTypes.number.isRequired,
  title:                PropTypes.string.isRequired,
  subtitle:             PropTypes.string.isRequired,
  timeSpan:             PropTypes.string.isRequired,
};

export default IlluScooterBlock;