import React, { Component } from 'react';
import FormAuth from './FormAuth';
import { API_FORGOT_PASSWORD } from '../assets/APIRoutes.js';

import '../styles/NavBar.css';

class NavBar extends Component {

  render() {
    return (
      <div className="navbar">
        <div className="logo-wrap">
          <div id="logo"></div>
          <h2>solar energy beautifully visualised</h2>
        </div>
        <button id="mobile-btn-sign">SIGN IN</button>
        <FormAuth className="sign-wrap">
          <div className="placeholder-wrap">
            <p>e-mail</p>
            <input type="email" name="email" tabIndex="1"/>
          </div>
          <div className="placeholder-wrap">
            <p>password <a href={ API_FORGOT_PASSWORD }>forgot?</a></p>
            <input type="password" name="password" tabIndex="2"/>
          </div>
          <button tabIndex="3">SIGN IN</button>
        </FormAuth>
      </div>
    )
  }
}

export default NavBar;