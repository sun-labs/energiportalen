import React from 'react';
import '../styles/Block.css';

const HEADER = 'HEADER';
const FOOTER = 'FOOTER';
const DEFAULT = 'DEFAULT';
const ADD = 'ADD';
const ILLUSTRATION = 'ILLUSTRATION';
const LINE = 'LINE';
const TABLE = 'TABLE';

const Header = (props) => {
  const { type = DEFAULT, 
          timeSpan = -1, 
          title = 'TITLE', 
          subtitle = 'SUBTITLE' } = props;

  switch(type) {
    case ILLUSTRATION:
    case LINE:
    case TABLE:
      return (
        <header>
          <div className="time-wrap">
            <p className="value">{ timeSpan }</p>
          </div>
          <div className="description-wrap">
            <p className="title">{ title }</p>
            <p className="subtitle">{ subtitle }</p>
          </div>
          <div className="tool-wrap">
            <p className="button">edit</p>
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

const render = (blockType, contentType) => {
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

const Block = (props) => {
  const { className, children, type } = props;

  return (
    <div className={`blockk ${className}`}>
      { render(type, HEADER) ? <Header {...props} /> : '' }

      <div className="content">
        {/*&nbsp;  DO NOT REMOVE THIS MOTHERFUCKER, okay. it seems to be cool /V */}
        { children }
      </div>

      { render(type, FOOTER) ? <Footer {...props} /> : '' }
    </div>
  );
}

export default Block;