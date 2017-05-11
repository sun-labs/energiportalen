import React, { Component } from 'react';

// STYLE IMPORTS
import '../styles/Home.css';
import '../styles/Locations.css';

// COMPONENT IMPORTS
import FacBlock from './Location'

class Locations extends Component {

  render() {
    return (
      <div className="content">
        <div className="text-block">
          <h1>LOCATIONS</h1>
          <h2> Search for solar facilities in sweden to compare and see how much energy that is produced. </h2>
        </div>
          <FacBlock/>
      </div>
    );
  }

}

export default Locations;