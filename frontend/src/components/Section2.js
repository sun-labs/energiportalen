import React from 'react';
import Section from './Section';
import TextContent from './TextContent';

import '../styles/Section2.css';

const Section2 = () => {
  return(
    <Section className="section2">
      <TextContent />
      <div className="clouds"></div>
    </Section>
  );
}

export default Section2;