import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import '../styles/DetailedBlock.css'
import FacBlock from './FacBlock';
import LineBlock from './LineBlock';
import * as routeConstants from '../../constants/routeConstants';

const c = {
  ...routeConstants
};

class DetailedBlock extends Component {
  render() {
    const { props } = this;

    const { 
      name = 'Stadshuset',
      subtitle = 'Stockholm',
      image,
      block
    } = props;

    return (
      <div className="detailedBlock">

        <header>
          <div className="compare-wrap">
            <FacBlock title={ name } subtitle={ subtitle } fac={ image }/>
            <Link to={`${c.PORTAL_ROOT}/locations/addCompare`} className="blockk add-block">+ ADD BLOCK</Link>
          </div>
        </header>

        <div className="content-detailedBlock">
            <LineBlock {...block} {...props} />
        </div>

        <footer>
        </footer>
      </div>
    );
  }
}

export default DetailedBlock;