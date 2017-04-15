import React from 'react';
import { ph_title, ph_body } from './Section';

import '../styles/Section.css';

const TextContent = ({ title, body }) => {
  return (
    <div className="text-content">
      <h2>{ title ? title : ph_title }</h2>
      <p>{ body ? body : ph_body  }</p>  
    </div>
  );
}

export default TextContent;