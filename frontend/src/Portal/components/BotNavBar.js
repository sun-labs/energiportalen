import React from 'react';

import '../styles/BotNavBar.css';

// NOTE maybe make a generic navbar to use for both portal & splash

const BotNavBar = () => {
  return (
    <nav className="bot-navbar-portal">
      <ul>
        <li className="dashboard icon">DASHBOARD</li>
        <li className="locations icon">LOCATION</li>
        <li className="search icon">SEARCH</li>
      </ul>
    </nav>
  );
}

export default BotNavBar;