import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ROOT } from './Portal';

// STYLE IMPORTS
import '../styles/Home.css';
import '../styles/DetailedBlock.css'

// COMPONENT IMPORTS
import FacBlock from './FacBlock';
import LineBlock from './LineBlock';

const DetailedBlock = (props) => {

const { 
    className = '',
    title = 'Stadshuset',
    subtitle = 'Stockholm',
    solarPlants = '158',
    totEffect = '340',
  } = props;

    return (
        <div className="detailedBlock">
          <header>
            <div className="compare-wrap">
              <FacBlock title={ title } subtitle={ subtitle } />  {/* TODO Send image to facblock*/}
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

export default DetailedBlock;