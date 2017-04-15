import React, { Component } from 'react';
import { ph_title, ph_body } from './Section.js';

import '../styles/Section.css';

class TextContent extends Component {

  render() {
    const title = this.props.title ? this.props.title : ph_title;
    const body = this.props.body ? this.props.body : ph_body;
    return(
        <div className="text-content">
          <h2>{ title }</h2>
          <p>{ body }</p>  
        </div>
    );
  }

}

export default TextContent;