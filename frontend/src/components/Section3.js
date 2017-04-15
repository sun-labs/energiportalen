
import React, { Component } from 'react';
import Section from './Section';
import TextContent from './TextContent';

import '../styles/Section3.css';

class Section3 extends Component {

  render() {
    return(
      <Section className="section3">
        <TextContent />
      </Section>
    );
  }

}

export default Section3;