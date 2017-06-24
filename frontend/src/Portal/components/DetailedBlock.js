import React from 'react';
import { Link } from 'react-router-dom';
import { ROOT } from './Portal';
import '../styles/Home.css';
import '../styles/DetailedBlock.css'
import FacBlock from './FacBlock';
import LineBlock from './LineBlock';

const DetailedBlock = (props) => {

const { 
    title = 'Stadshuset',
    subtitle = 'Stockholm',
    image
  } = props;

    return (
        <div className="detailedBlock">
          <header>
            <div className="compare-wrap">
              <FacBlock title={ title } subtitle={ subtitle } fac={ image }/>  {/* TODO Send image to facblock*/}
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