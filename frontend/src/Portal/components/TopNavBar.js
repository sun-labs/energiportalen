import React from 'react';

import '../styles/TopNavBar.css';

// NOTE maybe make a generic navbar to use for both portal & splash

const TopNavBar = () => {
  return (
    <div className="top-navbar-portal">
      <p className="edit-btn">EDIT</p>
      <p className="profile-btn">PROFILE</p>
    </div>
  );
}

export default TopNavBar;