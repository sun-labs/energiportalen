
import React, { Component } from 'react';
import Section from './Section.js';

import '../styles/Section2.css';

const placeholder = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

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