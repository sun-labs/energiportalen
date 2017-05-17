import React, { Component } from 'react';

import Block from './Block';

class IlluBlock extends Component {
  render() {
    const {
      generatedWh = 534.3, //TODO should be the generated energy from the solar facility
      mAh = 3000,        // size of battery
      V = 5,            // size of charger
      Wh = (mAh * V/1000), //formula
      x =  generatedWh/Wh, // generated energy / needed per phone
      value = Math.floor(x) // floor the value so that we display a integer

    } = this.props;

    const blockInfo = {
      value,
      type: 'ILLUSTRATION'
    }
    return(
    <Block className="blockk-illu" { ...blockInfo }>
      <div className="content-illu">
        <p className="value-illu">{ value }</p>
        <figure className="scooter"></figure>
        <figure className="earth"></figure>
      </div>
    </Block>
    );
  }
}

export default IlluBlock;