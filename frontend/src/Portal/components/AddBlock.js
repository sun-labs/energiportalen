import React, { Component } from 'react';
import '../styles/AddBlock.css';

import Block from './Block';
import ContentEdit from './ContentEdit';

class AddBlock extends Component {
  render() {
    const blockInfo = {
      ...this.props,
      type: 'ADD',
      title: 'ADD BLOCK',
    }

    return(
    <Block className="blockk-add" {...blockInfo}>
      <ContentEdit {...blockInfo} />
    </Block>
    );
  }
}

export default AddBlock;