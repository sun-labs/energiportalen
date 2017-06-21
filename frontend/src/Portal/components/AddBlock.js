import React, { Component } from 'react';
import '../styles/AddBlock.css';

import Block from './Block';
import ContentEdit from './ContentEdit';

class AddBlock extends Component {

  render() {

    const { 
      addNewBlock, 
      editing, 
      toggleEditBlock,
      dispatch
    } = this.props;

    const blockInfo = {
      type: 'ADD',
      title: 'ADD BLOCK',
      editing,
      toggleEditBlock,
      dispatch
    }

    return(
    <Block className="blockk-add" {...blockInfo}>
      <ContentEdit {...addNewBlock} />
    </Block>
    );
  }
}

export default AddBlock;