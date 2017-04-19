import React, { Component } from 'react';

// STYLE IMPORTS
import '../styles/Portal.css';

// COMPONENT IMPORTS
import NavBar from './NavBar';
import AddBlock from './AddBlock';

class Portal extends Component {

  render() {
    return (
      <div id="Portal">
        <NavBar />

        <div className="content">
          <AddBlock/>
        </div>
      </div>
    );
  }

}

export default Portal;


