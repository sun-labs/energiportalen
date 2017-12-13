import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from './Block';

class IlluBlock extends Component {
  render() {
    const {
      name,
      city,
      timeSpan,
      blockType,
      editing,
      blockId,
      className,
      children,
      removeBlock
     } = this.props;
    const blockInfo = {
      type: 'ILLUSTRATION',
      name,
      city,
      timeSpan,
      blockType,
      editing,
      blockId
    };
    return (
      <Block className={`blockk-illu ${className}`} { ...blockInfo } removeBlock={removeBlock}>
        <div className="content-illu">
          {children}
        </div>
      </Block>
    );
  }
}

IlluBlock.propTypes = {
  name:                PropTypes.string.isRequired,
  city:             PropTypes.string.isRequired,
  timeSpan:             PropTypes.string.isRequired,
  children:             PropTypes.oneOfType([
                          PropTypes.object,
                          PropTypes.array,
                        ]),
};

export default IlluBlock;