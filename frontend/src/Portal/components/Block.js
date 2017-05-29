import React from 'react';
import '../styles/Block.css';
import ContentEdit from './ContentEdit';

const HEADER = 'HEADER';
const FOOTER = 'FOOTER';
const DEFAULT = 'DEFAULT';
const ADD = 'ADD';
const ILLUSTRATION = 'ILLUSTRATION';
const LINE = 'LINE';
const TABLE = 'TABLE';

const Header = (props) => {
  const { 
    type = DEFAULT, 
    timeSpan = -1, 
    title = 'TITLE', 
    subtitle = 'SUBTITLE',
    from,
    to,
    editHandle
  } = props;

  switch(type) {
    case ILLUSTRATION:
    case LINE:
    case TABLE:
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
    case ADD:
      return (
        <div>
        </div>
      );
    case ILLUSTRATION:
    case LINE:
    case TABLE:
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

class Content extends React.Component {

  render() {

    const { type, children, editing } = this.props;
    let content = children;

    if(editing) {
      switch(type) {
        case ILLUSTRATION:
        case LINE:
        case TABLE:
          content = <ContentEdit />;
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

class Block extends React.Component {

  constructor() {
    super();
    this.state = {
      editing: false
    }
    this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      editing: !this.state.editing
    });
  }

  shouldRender(blockType, contentType) {
    switch(blockType) {
      case ADD:
        return false;
      case ILLUSTRATION:
      case LINE:
      case TABLE:
        return true;
      default:
        return false;
    }
  }

  render() {
    const { className, children, type } = this.props;

    return (
      <div className={`blockk ${className}`}>
        { this.shouldRender(type, HEADER) ? <Header {...this.props} editHandle={ this.handleClick.bind(this) } /> : '' }

        <Content {...this.props} editing={ this.state.editing }>
          { children }
        </Content>

        { this.shouldRender(type, FOOTER) ? <Footer {...this.props} /> : '' }
      </div>
    );
  }

}

export default Block;