import React from 'react';
import Section from './Section';
import TextContent from './TextContent';
import FormSignUp from './FormSignUp';

import logo from '../imgs/logo.png';
import downButton from '../imgs/downButton.png';

import '../styles/Section1.css';

const Section1 = () => {
  return(
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
  );
}

export default Section1;