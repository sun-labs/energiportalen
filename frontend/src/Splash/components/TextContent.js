import React from 'react';
import { ph_title, ph_body } from './Sections';
import PropTypes from 'prop-types';
import '../styles/Section.css';

const TextContent = ({ title, body }) => {
  return (
    <div className="text-content">
      <h2>{ title ? title : ph_title }</h2>
      <p>{ body ? body : ph_body  }</p>  
    </div>
  );
}

TextContent.propTypes = {
  title:                  PropTypes.string.isRequired,
  body:                  PropTypes.string.isRequired
};

export default TextContent;