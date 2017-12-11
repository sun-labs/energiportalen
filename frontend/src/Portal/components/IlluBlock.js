import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from './Block';

class IlluBlock extends Component {
  render() {
    const { 
      title,
      subtitle,
      timeSpan,
      blockType,
      editing,
      blockId,
      className,
      children
     } = this.props;
    const blockInfo = {
      type: 'ILLUSTRATION',
      title: title,
      subtitle: subtitle,
      timeSpan: timeSpan,
      blockType: blockType,
      editing: editing,
      blockId: blockId
    }
    return (
      <Block className={`blockk-illu ${className}`} { ...blockInfo }>
        <div className="content-illu">
          {children}
        </div>
      </Block>
    );
  }
}

IlluBlock.propTypes = {
  title:                PropTypes.string.isRequired,
  subtitle:             PropTypes.string.isRequired,
  timeSpan:             PropTypes.string.isRequired,
  children:             PropTypes.oneOfType([
                          PropTypes.object,
                          PropTypes.array,
                        ]),
};

export default IlluBlock;