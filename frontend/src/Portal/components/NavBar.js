import React from 'react';

import logo from '../../imgs/logo.png';

import '../styles/NavBar.css';

// NOTE maybe make a generic navbar to use for both portal & splash

const NavBar = () => {
  return (
    <div className="navbar-portal">
      <p className="edit-btn">EDIT</p>
      <img className="logo" src={ logo } alt="Sun Labs Logo" />
      <p className="profile-btn">PROFILE</p>
    </div>
  );
}

export default NavBar;