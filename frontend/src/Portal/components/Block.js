import React, { Component } from 'react';
import ContentEdit from './ContentEdit';
import * as blockConstants from '../../constants/blockConstants';
import PropTypes from 'prop-types';
import '../styles/Block.css';

const c = {
  ...blockConstants
};

const Header = (props) => {
  const {
    blockType = c.DEFAULT,
    timeSpan = -1,
    title = 'TITLE',
    subtitle = 'SUBTITLE',
    from,
    to,
    editHandle
  } = props;

  switch(blockType) {
    case c.ILLUSTRATION:
    case c.LINE:
    case c.TABLE:
      return (
        <header>
          <div className="time-wrap">
            <p className="value" alt={`${from} - ${to}`}>{ timeSpan }</p>
          </div>
          <div className="description-wrap">
            <p className="title">{ title }</p>
            <p className="subtitle">{ subtitle }</p>
          </div>
          <div className="tool-wrap">
            <p onClick={ editHandle } className="button">edit</p>
          </div>
        </header>
      );
    default:
    return;
  }
}

const Footer = (props) => {
  const { blockType } = props;

  switch(blockType) {
    case c.ADD:
      return (
        <div>
        </div>
      );
    case c.ILLUSTRATION:
    case c.LINE:
    case c.TABLE:
      return (
        <footer>
          <ul>
            <li><button>DAILY</button></li>
            <li><button>WEEKLY</button></li>
            <li><button>MONTHLY</button></li>
            <li><button>YEARLY</button></li>
            <li><button id="export-data">export data</button></li>
          </ul>
        </footer>
      );
    default:
    return;
  }
}

class Content extends Component {

  render() {

    const { blockType, children, editing } = this.props;
    let content = children;

    if(editing) {
      switch(blockType) {
        case c.ILLUSTRATION:
        case c.LINE:
        case c.TABLE:
          content = <ContentEdit {...this.props} />;
        break;
        default:
          break;
      }
    }

    return (
      <div className="content">
        { content }
      </div>
    );
  }
}

class Block extends Component {

  constructor() {
    super();
    this.state = {
      editing: false,

    }
    this.shouldRender = this.shouldRender.bind(this);
    this.getCSSClass = this.getCSSClass.bind(this);
  }

  shouldRender(blockType, contentType) {
    switch(blockType) {
      case c.ADD:
        return false;
      case c.ILLUSTRATION:
      case c.LINE:
      case c.TABLE:
        return true;
      default:
        return false;
    }
  }

  getCSSClass(blockType) {
    switch(blockType) {
      case c.LINE:
        return "blockk-line";
      case c.TABLE:
        return "blockk-table";
      default: // illustration blocks
        return this.props.className;
    }
  }

  render() {
    
    const {
      props,
      shouldRender,
      getCSSClass
    } = this;

    const {
      children,
      blockType,
      editing,
      blockId = null // TODO handle when null & "toggleEditBlock" --> locationBlock
    } = props;


    return (
      <div className={`blockk ${getCSSClass(blockType)}`}>
        { shouldRender(blockType, c.HEADER) ? <Header {...props} editHandle={() => props.toggleEditBlock(blockId)} /> : '' }

        <Content {...props} editing={ editing }>
          { children ? children : null }
        </Content>

        { shouldRender(blockType, c.FOOTER) ? <Footer {...props} /> : '' }
      </div>
    );
  }
}

Block.propTypes = {
  title:            PropTypes.string.isRequired,
  children:         PropTypes.object.isRequired,
  editing:          PropTypes.bool.isRequired,
  className:        PropTypes.string.isRequired,

  blockType:        PropTypes.string,
  subtitle:         PropTypes.string,
  blockId:          PropTypes.number,
  toggleEditBlock:  PropTypes.func, // TODO maybe should be required?
  editHandle:       PropTypes.func, // TODO maybe should be required?
  to:               PropTypes.string,
  from:             PropTypes.string,
  timeSpan:         PropTypes.string,
};

export default Block;