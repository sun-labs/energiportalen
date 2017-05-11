import React, { Component } from 'react';
import '../styles/AddBlock.css';

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
      <input className="chooseLoc-add" placeholder="CHOOSE LOCATION"/>
      <input className="chooseBlock-add" placeholder="CHOOSE BLOCK TYPE"/>
      <input className="chooseTime-add" placeholder="TIME SPAN"/>
      <input className="chooseContent-add" placeholder="CHOOSE CONTENT"/>
      <button>
        SAVE BLOCK
      </button>
    </Block>
    );
  }
}

export default IlluBlock;