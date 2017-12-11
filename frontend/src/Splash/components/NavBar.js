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
    this.togglePopup = this.togglePopup.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

  renderPopup() {
    const {
      authSignIn,
    } = this.props;

    if(this.state.popupVisible) {
      return (
        <Popup className="popup-auth" onClose={ this.togglePopup }>
          <h1>Sign in</h1>
          <FormAuth className="wrap-auth" authSignIn={authSignIn} />
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
    const {
      authSignIn,
    } = this.props;

    return (
      <div className="navbar-splash">
        { this.renderPopup() }
        <div className="logo-wrap">
          <div id="logo"></div>
          <h2>solar energy beautifully visualized</h2>
        </div>
        <button id="mobile-btn-sign" onClick={ this.togglePopup }>SIGN IN</button>
        <FormAuth className="sign-wrap" authSignIn={authSignIn} />
      </div>
    );
  }
}

export default NavBar;