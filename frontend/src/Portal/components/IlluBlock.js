import React, { Component } from 'react';

import Block from './Block';

class IlluBlock extends Component {
  render() {

    const blockInfo = {
      type: 'ILLUSTRATION',
      title: this.props.title,
      subtitle: this.props.subtitle,
      timeSpan: this.props.timeSpan
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