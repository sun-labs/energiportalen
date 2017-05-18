import React, { Component } from 'react';

import Block from './Block';

class IlluBlock extends Component {
  render() {

    const blockInfo = {
      type: 'ILLUSTRATION'
    }
    return(
    <Block className={`blockk-illu ${this.props.className}`} { ...blockInfo }>
      <div className="content-illu">
        { this.props.children }
      </div>
    </Block>
    );
  }
}

export default IlluBlock;