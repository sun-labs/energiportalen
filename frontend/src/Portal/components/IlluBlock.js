import React, { Component } from 'react';

import Block from './Block';

class IlluBlock extends Component {
  render() {
    const {
      value = 534.3,
    } = this.props;

    const blockInfo = {
      value
    }
    return(
    <Block className="blockk-illu" { ...blockInfo }>
      <div className="content-illu">
        <p className="value-illu">{ this.props.value }</p>
        <figure className="scooter"></figure>
        <figure className="earth"></figure>
      </div>
    </Block>
    );
  }
}

export default IlluBlock;