import React from 'react';
import Section from './Section';
import TextContent from './TextContent';

import '../styles/Section4.css';

const Section4 = () => {
  return(
    <Section className="section4">
      <TextContent />
      <div id="lulLogo"></div>
      <div id="euLogo"></div>
      <div id="sunlabsLogo"></div>
    </Section>
  );
}

export default Section4;