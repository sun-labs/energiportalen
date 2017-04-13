import React from 'react';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="logo-wrap">
        <h1>ENERGIPORTALEN.</h1>
        <h2>sun is shining for lemons</h2>
      </div>
      <div className="sign-wrap">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="password" />
        <button>SIGN IN</button>
      </div>
    </div>
  );
}

export default NavBar;