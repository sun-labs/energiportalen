import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ROOT } from './Portal';

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
              <FacBlock subtitle={"Uppsala"} />
              <Link to={`${ROOT}/locations/addCompare`} className="blockk add-block">+ ADD BLOCK</Link>
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