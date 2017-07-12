import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import '../styles/BotNavBar.css';

const c = {
  ...routeConstants
};

// NOTE maybe make a generic navbar to use for both portal & splash

const BotNavBar = ({ history }) => {
  return (
    <nav className="bot-navbar-portal">
      <ul>
        <li className="dashboard icon">
          <Link to={`${c.PORTAL_ROOT}/`}>DASHBOARD</Link>
        </li>
        <li className="locations icon"> 
          <Link to={`${c.PORTAL_ROOT}/locations`}>LOCATIONS</Link>
        </li>
        <li className="sign-out icon" onClick={() => {
          localStorage.removeItem('token');
          history.push('/');
        }}>SIGN OUT</li>
      </ul>
    </nav>
  );
}

BotNavBar.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(BotNavBar);