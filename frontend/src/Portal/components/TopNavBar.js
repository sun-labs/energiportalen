import React from 'react';

import '../styles/TopNavBar.css';

// NOTE maybe make a generic navbar to use for both portal & splash

const TopNavBar = () => {
  return (
    <div className="top-navbar-portal">
      <p className="edit-btn" onClick={() => alert('EDIT')}>EDIT</p>
      <p className="profile-btn" onClick={() => alert('PROFILE')}>PROFILE</p>
    </div>
  );
}

export default TopNavBar;