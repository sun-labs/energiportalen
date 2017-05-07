import React, { Component } from 'react';

// STYLE IMPORTS
import '../styles/Home.css';
import '../styles/DetailedBlock.css'

// COMPONENT IMPORTS
import FacBlock from './FacBlock';
import LineBlock from './LineBlock';

class DetailedBlock extends Component {

  render() {
    return (
        <div className="detailedBlock">
          <header>
            <div className="compare-wrap">
              <FacBlock/>
              <FacBlock/>
            </div>
          </header>
        <div className="content-detailedBlock">
            <LineBlock/>
        </div>
          <footer>

          </footer>
          
          
        </div>
    );
  }

}

export default DetailedBlock;