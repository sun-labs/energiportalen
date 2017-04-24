import React from 'react';

import '../styles/TopNavBar.css';

// NOTE maybe make a generic navbar to use for both portal & splash

const TopNavBar = () => {
  return (
    <div className="top-navbar-portal">
      <p className="dash-btn">DASHBOARD</p>
      <p className="facil-btn">FACILITIES</p>
      <p className="search search-btn-desktop">SEARCH</p>
      <p className="edit-btn">EDIT</p>
      <p className="profile-btn">PROFILE</p>
    </div>
  );
}

export default TopNavBar;