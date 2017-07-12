import React, { Component } from 'react';
import Block from './Block';
import ContentEdit from './ContentEdit';
import '../styles/AddBlock.css';

class AddBlock extends Component {
  render() {
    const blockInfo = {
      ...this.props,
      blockType: 'ADD',
      title: 'ADD BLOCK',
      editing: true
    }

    return(
    <Block className="blockk-add" {...blockInfo}>
      <ContentEdit {...blockInfo} />
    </Block>
    );
  }
}

export default AddBlock;