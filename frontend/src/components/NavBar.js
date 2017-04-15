import React, { Component } from 'react';

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
        <form className="sign-wrap" action="#" method="GET">
          <div className="placeholder-wrap">
            <p>e-mail</p>
            <input type="email" name="email" />
          </div>
          <div className="placeholder-wrap">
            <p>password <a href="#">forgot?</a></p>
            <input type="password" name="password" />
          </div>
          <button>SIGN IN</button>
        </form>
      </div>
    )
  }
}

export default NavBar;