import React from 'react';

import '../styles/Block.css';

const renderBlock = (type, content) => {
  switch(type) {
    case 'ADD':
    break;
    case 'ILLUSTRATION':
    break;
    case 'LINE':
    break;
    case 'TABLE':
    break;
    default:
    break;
  }
}

const Block = (props) => {

  const { 
    children, 
    className = '',
    title = 'title',
    subtitle = 'subtitle',
    timeSpan = '00h',
    type = 'DEFAULT'
  } = props;

  return (
    <div className={`blockk ${className}`}>
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

      <div className="content">
        {/*&nbsp;  DO NOT REMOVE THIS MOTHERFUCKER, okay. it seems to be cool /V */}
        { children }
      </div>

      <footer>
        <ul>
          <li><button>DAILY</button></li>
          <li><button>WEEKLY</button></li>
          <li><button>MONTHLY</button></li>
          <li><button>YEARLY</button></li>
          <li><button id="export-data">export data</button></li>
        </ul>
      </footer>

    </div>);
}

export default Block;

/*<div className="header">
        <div className="name-location">
          <h3 className="name">{name} <span className="edit">EDIT</span> </h3>
          <p className="location">{location}</p>
        </div>
      </div>

      <div className="content-gen-block">
        <TinyInfoBlock/>
        <Link to="/">+ add information</Link>
</div>*/