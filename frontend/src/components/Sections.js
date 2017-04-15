import React from 'react';
import Section from './Section';
import TextContent from './TextContent';
import FormSignUp from './FormSignUp';
import '../styles/Sections.css';

import logo from '../imgs/logo.png';
import downButton from '../imgs/downButton.png';

const ph_title = 'What is Sun Labs?';
const ph_body = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

export { ph_body, ph_title };

const Sections = () => {
  return (
    <div className="sections">

      {/* SECTION 1 */}
      <Section className="section1">
        <div className="clouds"></div>
        <img className="logo" src={ logo } alt="Sun Labs Logo" />
        <FormSignUp className="creat-wrap">
          <h1>SIGN UP</h1>
          <h2>It's free and will always be</h2>
          <input type="email" placeholder="e-mail" name="email" />
          <input type="password" placeholder="password" name="password" />
          <input type="password" placeholder="verify password" name="password-verify" />
          <button>CREATE ACCOUNT</button>
        </FormSignUp>
        <button id="mobile-btn-create-account">CREATE ACCOUNT</button>
        <TextContent />
        <img className="downButton" src={ downButton } alt="Down Button" />
        <div className="hill"></div>
      </Section>

      {/* SECTION 2 */}
      <Section className="section2">
        <TextContent />
        <div className="clouds"></div>
      </Section>

      {/* SECTION 3 */}
      <Section className="section3">
        <TextContent />
      </Section>

      {/* SECTION 4 */}
      <Section className="section4">
        <TextContent />
        <div id="lulLogo"></div>
        <div id="euLogo"></div>
        <div id="sunlabsLogo"></div>
      </Section>
    </div>    
  );
}

export default Sections;