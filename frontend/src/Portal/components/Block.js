import React from 'react';

import '../styles/Block.css';

const Block = (props) => {

  const { 
    children, 
    className = '',
    title = 'title',
    subtitle = 'subtitle',
    timeSpan = '00h'
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
        &nbsp; {/* DO NOT REMOVE THIS MOTHERFUCKER */}
        { children }
      </div>

      <footer>
        <p>footer</p>
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