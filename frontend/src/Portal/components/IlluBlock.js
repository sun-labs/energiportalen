import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from './Block';

class IlluBlock extends Component {
  render() {
    const { props } = this;
    const blockInfo = {
      type: 'ILLUSTRATION',
      title: props.title,
      subtitle: props.subtitle,
      timeSpan: props.timeSpan,
      blockType: props.blockType,
      editing: props.editing,
      blockId: props.blockId
    }
    return(
    <Block className={`blockk-illu ${props.className}`} { ...blockInfo }>
      <div className="content-illu">
        { props.children }
      </div>
    </Block>
    );
  }
}

IlluBlock.propTypes = {
  title:                PropTypes.string.isRequired,
  subtitle:             PropTypes.string.isRequired,
  timeSpan:             PropTypes.string.isRequired,
  children:             PropTypes.array.isRequired,
};

export default IlluBlock;