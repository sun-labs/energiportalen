import React from 'react';
import { withRouter } from 'react-router';
import '../styles/BotNavBar.css';

import { Link } from 'react-router-dom';
import { ROOT } from './Portal';

// NOTE maybe make a generic navbar to use for both portal & splash

const BotNavBar = ({ history }) => {
  return (
    <nav className="bot-navbar-portal">
      <ul>
        <li className="dashboard icon">
          <Link to={`${ROOT}/`}>DASHBOARD</Link>
        </li>
        <li className="locations icon">LOCATION</li>
        <li className="sign-out icon" onClick={() => {
          localStorage.removeItem('token');
          history.push('/');
        }}>SIGN OUT</li>
      </ul>
    </nav>
  );
}

export default withRouter(BotNavBar);