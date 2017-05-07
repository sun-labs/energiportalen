import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ROOT } from './Portal';

// STYLE IMPORTS
import '../styles/Home.css';
import '../styles/Locations.css';

// COMPONENT IMPORTS
import FacBlock from './FacBlock';

class Locations extends Component {

  render() {
    return (
      <div className="content">
        <div className="text-block">
          <h1>LOCATIONS</h1>
          <h2> Search for solar facilities in sweden to compare and see how much energy that is produced. </h2>
        </div>
        <div className="FacBlock-wrap">
          <Link to={`${ROOT}/locations/1`}> <FacBlock/> </Link>
          <FacBlock/>
          <FacBlock/>
          <FacBlock/>
        </div>
      </div>
    );
  }

}

export default Locations;