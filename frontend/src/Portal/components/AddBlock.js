import React, { Component } from 'react';
import Block from './Block';
import ContentEdit from './ContentEdit';
import cross from '../../imgs/cross.svg';
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
      <div className="overlay">
        <div className="overlay-outer-content-wrapper">
          <div className="overlay-inner-content-wrapper">
            <Block className="blockk-add" {...blockInfo}>
              <img className="img-cross" alt="" src={ cross } onClick={() => this.props.toggleAddBlock()}/>
              <ContentEdit {...blockInfo} />
            </Block>
          </div>
        </div>
      </div>
    );
  }
}

export default AddBlock;