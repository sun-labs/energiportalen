import React, { Component } from 'react';

import Block from './Block';

class IlluBlock extends Component {
  render() {
    const {
      value = 534.3,
    } = this.props;

    const blockInfo = {
      value,
      type: 'ADD'
    }
    return(
    <Block className="blockk-add">
      <div className="content-add">
      </div>
    </Block>
    );
  }
}

export default IlluBlock;