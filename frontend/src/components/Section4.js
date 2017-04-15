
import React, { Component } from 'react';
import Section from './Section';
import TextContent from './TextContent';

import '../styles/Section4.css';

class Section4 extends Component {

  render() {
    return(
      <Section className="section4">
        <TextContent />
        <div id="lulLogo"></div>
        <div id="euLogo"></div>
        <div id="sunlabsLogo"></div>
      </Section>
    );
  }

}

export default Section4;