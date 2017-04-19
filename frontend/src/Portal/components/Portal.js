import React, { Component } from 'react';

// STYLE IMPORTS
import '../styles/Portal.css';

// COMPONENT IMPORTS
import NavBar from './NavBar';

class Portal extends Component {

  render() {
    return (
      <div id="Portal">
        <NavBar />
        <h1>This is the portal.</h1>
      </div>
    );
  }

}

export default Portal;


