import React, { Component } from 'react';
import IlluBlock from './IlluBlock';
import PropTypes from 'prop-types';

class IlluScooterBlock extends Component {

  constructor() {
    super();

    this.calcTurnsAroundEarth = this.calcTurnsAroundEarth.bind(this);
  }

  componentWillMount() {
    const {
      fetchSumValueData,
      timeSpan,
      interval,
      unitId,
      keyId,
      blockId,
      blockType,
      rowId
    } = this.props;
    fetchSumValueData({ timeSpan, interval, unitId, keyId, blockId, blockType, rowId });
  }

  /**
   * @param {Int} energy in kWh
   */
  calcTurnsAroundEarth(energy) {
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

    const {
      value,
      name,
      city,
      timeSpan,
      blockType,
      editing,
      blockId,
    } = this.props;

    return(
    <IlluBlock
      className="block-scooter"
      name={name}
      city={city}
      timeSpan={timeSpan}
      blockType={blockType}
      editing={editing}
      blockId={blockId}
    >
        <p className="value-illu">{ this.calcTurnsAroundEarth(value).toFixed(2) }</p>
        <figure className="scooter"></figure>
        <figure className="earth"></figure>
    </IlluBlock>
    );
  }
}

IlluScooterBlock.propTypes = {
  value:                PropTypes.number.isRequired,
  name:                PropTypes.string.isRequired,
  city:             PropTypes.string.isRequired,
  timeSpan:             PropTypes.string.isRequired,
};

export default IlluScooterBlock;