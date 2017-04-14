
import React, { Component } from 'react';
import Section from './Section.js';

const placeholder = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

class Section4 extends Component {

  render() {
    return(
      <Section className="section4">
        <div className="text-content">
          <h2>What is energiportalen?</h2>
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