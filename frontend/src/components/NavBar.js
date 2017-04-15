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
        <form action="#" method="GET" className="sign-wrap">
          <div className="placeholder-wrap">
            <p>e-mail</p>
            <input type="email" name="email" placeholder="e-mail" />
          </div>
          <div className="placeholder-wrap">
            <p>password <a href="#">forgot?</a></p>
            <input type="password" name="password" placeholder="password" />
          </div>
          <button>SIGN IN</button>
        </form>
      </div>
    )
  }
}

export default NavBar;