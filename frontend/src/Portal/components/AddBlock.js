import React, { Component } from 'react';

import Block from './Block';

class IlluBlock extends Component {
  render() {
    const {
      value = 534.3,
    } = this.props;

    const blockInfo = {
      value,
      type: 'ADD',
      title: 'ADD BLOCK'
    }
    return(
    <Block className="blockk-add" {...blockInfo}>
      <p>
        ADD BLOCK THINGY
      </p>
    </Block>
    );
  }
}

export default IlluBlock;