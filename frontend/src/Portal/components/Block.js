import React, { Component } from 'react';
import '../styles/Block.css';
import ContentEdit from './ContentEdit';
import * as blockConstants from '../../constants/blockConstants';

const c = {
  ...blockConstants
};

const Header = (props) => {
  const {
    type = c.DEFAULT,
    timeSpan = -1,
    title = 'TITLE',
    subtitle = 'SUBTITLE',
    from,
    to,
    editHandle
  } = props;

  switch(type) {
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
  const { type } = props;

  switch(type) {
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

    const { type, children, editing } = this.props;
    let content = children;

    if(editing) {
      switch(type) {
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
      type,
      editing,
      blockId = null // TODO handle when null & "toggleEditBlock" --> locationBlock
    } = props;


    return (
      <div className={`blockk ${getCSSClass(type)}`}>
        { shouldRender(type, c.HEADER) ? <Header {...props} editHandle={() => props.toggleEditBlock(blockId)} /> : '' }

        <Content {...props} editing={ editing }>
          { children ? children : null }
        </Content>

        { shouldRender(type, c.FOOTER) ? <Footer {...props} /> : '' }
      </div>
    );
  }

}

export default Block;