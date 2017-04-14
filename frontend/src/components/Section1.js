
import React, { Component } from 'react';
import Section, { placeholder } from './Section.js';

import logo from '../imgs/logo.png';
import downButton from '../imgs/downButton.png';

import '../styles/Section1.css';

class Section1 extends Component {

  render() {
    return(
      <Section className="section1">
        <div className="clouds"></div>
        <img className="logo" src={ logo } alt="Sun Labs Logo" />
        <div className="creat-wrap">
          <h1>SIGN UP</h1>
          <h2>It's free and will always be</h2>
          <input type="email" placeholder="e-mail" name="email" />
          <input type="password" placeholder="password" name="password" />
          <input type="password" placeholder="verify password" name="password-verify" />
          <button>CREATE ACCOUNT</button>
        </div>
        <button id="mobile-btn-create-account">CREATE ACCOUNT</button>
        <div className="text-content">
          <h2>What is energiportalen?</h2>
          <p>{ placeholder }</p>  
        </div>
        <img className="downButton" src={ downButton } alt="Down Button" />
        <div className="hill"></div>
      </Section>
    );
  }

}

export default Section1;