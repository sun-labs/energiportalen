import React, { Component } from 'react';
import '../styles/NavBar.css';


class NavBar extends Component {

  render() {
    return (
      <div className="navbar">
        <div className="logo-wrap">
          <h1>ENERGIPORTALEN.</h1>
          <h2>sun is shining for lemons</h2>
        </div>
        <div className="sign-wrap">
          <input type="email" name="email" placeholder="e-mail" />
          <input type="password" name="password" placeholder="password" />
          <button>SIGN IN</button>
        </div>
      </div>
    )
  }
}

export default NavBar;