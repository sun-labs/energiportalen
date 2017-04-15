
import React, { Component } from 'react';
import Section, { placeholder, title } from './Section.js';

import '../styles/Section3.css';

class Section3 extends Component {

  render() {
    return(
      <Section className="section3">
        <div className="text-content">
          <h2>{ title }</h2>
          <p>{ placeholder }</p>  
        </div>
      </Section>
    );
  }

}

export default Section3;