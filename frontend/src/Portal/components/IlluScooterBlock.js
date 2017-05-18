import React, { Component } from 'react';

import IlluBlock from './IlluBlock';

class IlluScooterBlock extends Component {

  /**
   * 
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

    const { value = 100 } = this.props;
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