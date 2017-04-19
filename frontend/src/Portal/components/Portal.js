import React, { Component } from 'react';

// STYLE IMPORTS
import '../styles/Portal.css';

// COMPONENT IMPORTS
import NavBar from './NavBar';
import AddBlock from './AddBlock';
import Block from './Block';

class Portal extends Component {

  render() {
    return (
      <div id="Portal">
        <NavBar />

        <div className="content">
          <AddBlock/>
          <Block/>
        </div>
      </div>
    );
  }

}

export default Portal;


