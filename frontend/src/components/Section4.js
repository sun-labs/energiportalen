
import React, { Component } from 'react';
import Section, { placeholder, title } from './Section.js';

import '../styles/Section4.css';

class Section4 extends Component {

  render() {
    return(
      <Section className="section4">
        <div className="text-content">
          <h2>{ title }</h2>
          <p>{ placeholder }</p>  
        </div>
        <div id="lulLogo"></div>
        <div id="euLogo"></div>
        <div id="sunlabsLogo"></div>
      </Section>
    );
  }

}

export default Section4;