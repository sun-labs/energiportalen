import React, { Component } from 'react';
import Section from './Section';
import TextContent from './TextContent';
import FormSignUp from './FormSignUp';
import Popup from './Popup';

import '../styles/Sections.css';

import logo from '../imgs/logo.png';
import downButton from '../imgs/downButton.png';

const ph_title = 'What is Sun Labs?';
const ph_body = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

class Section1 extends Component {

  constructor() {
    super();
    this.state = {
      popupVisible: false
    };
  }

  togglePopup(e) {
    this.setState({
      popupVisible: !this.state.popupVisible
    });
  }

  renderPopup() {
    if (this.state.popupVisible) {
      return (
        <Popup className="popup-signup" onClose={this.togglePopup.bind(this)}>
          <FormSignUp className="wrap-signup">
            <h1>SIGN UP</h1>
            <div className="placeholder-wrap">
              <p>e-mail</p>
              <input type="email" name="email" placeholder="e-mail" tabIndex="4" />
            </div>
            <div className="placeholder-wrap">
              <p>password</p>
              <input type="password" name="password" placeholder="password" tabIndex="5" />
            </div>
            <div className="placeholder-wrap">
              <p>verify password</p>
              <input type="password" name="passwordVerify" placeholder="verify password" tabIndex="6" />
            </div>
            <button>CREATE ACCOUNT</button>
          </FormSignUp>
        </Popup>
      );
    } else {
      return;
    }
  }

  render() {
    return (
      <Section className="section1">
        { this.renderPopup() }
        <div className="clouds"></div>
        <img className="logo" src={ logo } alt="Sun Labs Logo" />
        <FormSignUp className="creat-wrap">
          <h1>SIGN UP</h1>
          <h2>It's free and will always be</h2>
          <div className="placeholder-wrap">
            <p>e-mail</p>
            <input type="email" name="email" placeholder="e-mail" tabIndex="4" />
          </div>
          <div className="placeholder-wrap">
            <p>password</p>
            <input type="password" name="password" placeholder="password" tabIndex="5" />
          </div>
          <div className="placeholder-wrap">
            <p>verify password</p>
            <input type="password" name="passwordVerify" placeholder="verify password" tabIndex="6" />
          </div>
          <button tabIndex="7">CREATE ACCOUNT</button>
        </FormSignUp>
        <button id="mobile-btn-create-account" onClick={ this.togglePopup.bind(this) }>CREATE ACCOUNT</button>
        <TextContent />
        <img className="downButton" src={ downButton } alt="Down Button" />
        <div className="hill"></div>
      </Section>
    );
  }

}

const Section2 = () => {
  return (
    <Section className="section2">
      <TextContent />
      <div className="clouds"></div>
    </Section>
  )
}

const Section3 = () => {
  return (
    <Section className="section3">
      <TextContent />
    </Section>
  )
}

const Section4 = () => {
  return (
    <Section className="section4">
      <TextContent />
      <div id="lulLogo"></div>
      <div id="euLogo"></div>
      <div id="sunlabsLogo"></div>
    </Section>
  )
}

const Sections = () => {
  return (
    <div className="sections">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}

export { ph_title, ph_body };
export default Sections;