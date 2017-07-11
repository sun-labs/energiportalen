import React from 'react';

import '../styles/Section.css';

const Section = ({ className, children }) => {
  return (
    <div className={`section ${className ? className : ''}`}>
      { children ? children : null }
      <div className="header"></div>
      <div className="footer"></div>
    </div>
  );
}

export default Section;