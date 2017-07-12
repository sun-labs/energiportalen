import React from 'react';
import PropTypes from 'prop-types';
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

Section.propTypes = {
  className:            PropTypes.string.isRequired,
  children:             PropTypes.oneOfType([
                          PropTypes.object,
                          PropTypes.array,
                        ]),
};

export default Section;