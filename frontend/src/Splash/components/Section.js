import React from 'react';

import '../styles/Section.css';

const Section = ({ className, children }) => {
  const sectionClass = className ? className : '';
  return (
    <div className={`section ${sectionClass}`}>
      { children ? children : '' }
      <div className="header"></div>
      <div className="footer"></div>
    </div>
  );
}

export default Section;