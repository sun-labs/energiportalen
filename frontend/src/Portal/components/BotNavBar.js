import React from 'react';

import '../styles/BotNavBar.css';

import logo from '../../imgs/logo.png';

// NOTE maybe make a generic navbar to use for both portal & splash

const BotNavBar = () => {
  return (
    <div className="bot-navbar-portal">
      <p className="dashboard icon" onClick={() => alert('DASHBOARD')}>DASHBOARD</p>
      <p className="locations icon" onClick={() => alert('LOCATION')}>LOCATION</p>      
      <p className="search icon" onClick={() => alert('SEARCH')}>SEARCH</p>
    </div>
  );
}

export default BotNavBar;