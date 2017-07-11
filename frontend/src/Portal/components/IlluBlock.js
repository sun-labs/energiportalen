import React, { Component } from 'react';

import Block from './Block';

class IlluBlock extends Component {
  render() {
    const { props } = this;
    const blockInfo = {
      type: 'ILLUSTRATION',
      title: props.title,
      subtitle: props.subtitle,
      timeSpan: props.timeSpan,
      editing: props.editing,
      blockId: props.blockId
    }
    return(
    <Block className={`blockk-illu ${props.className}`} { ...blockInfo }>
      <div className="content-illu">
        { props.children ? props.children : null }
      </div>
    </Block>
    );
  }
}

export default IlluBlock;