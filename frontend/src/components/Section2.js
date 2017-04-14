
import React, { Component } from 'react';
import Section, { placeholder } from './Section.js';

import '../styles/Section2.css';

class Section2 extends Component {

  render() {
    return(
      <Section className="section2">
        <div className="clouds"></div>
        <div className="text-content">
          <h2>What is energiportalen?</h2>
          <p>{ placeholder }</p>  
        </div>
      </Section>
    );
  }

}

export default Section2;