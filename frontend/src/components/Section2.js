
import React, { Component } from 'react';
import Section from './Section';
import TextContent from './TextContent';

import '../styles/Section2.css';

class Section2 extends Component {

  render() {
    return(
      <Section className="section2">
        <TextContent />
        <div className="clouds"></div>
      </Section>
    );
  }

}

export default Section2;