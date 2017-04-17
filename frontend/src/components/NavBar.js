import React, { Component } from 'react';
import FormAuth from './FormAuth';
import Popup from './Popup';

import '../styles/NavBar.css';

class NavBar extends Component {

  constructor() {
    super();
    this.state = {
      popupVisible: false
    };
  }

  renderPopup() {
    if(this.state.popupVisible) {
      return (
        <Popup className="popup-auth" onClose={ this.togglePopup.bind(this) }>
          <h1>Sign in</h1>
          <FormAuth className="wrap-auth" />
        </Popup>
      );
    } else {
      return;
    }
  }

  togglePopup(e) {
    this.setState({
      popupVisible: !this.state.popupVisible
    });
  }

  render() {
    return (
      <div className="navbar">
        {this.renderPopup()}
        <div className="logo-wrap">
          <div id="logo"></div>
          <h2>solar energy beautifully visualised</h2>
        </div>
        <button id="mobile-btn-sign" onClick={this.togglePopup.bind(this)}>SIGN IN</button>
        <FormAuth className="sign-wrap" />
      </div>
    );
  }
}

export default NavBar;