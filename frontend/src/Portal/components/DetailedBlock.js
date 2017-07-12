import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import '../styles/DetailedBlock.css'
import FacBlock from './FacBlock';
import LineBlock from './LineBlock';
import PropTypes from 'prop-types';
import * as routeConstants from '../../constants/routeConstants';

const c = {
  ...routeConstants
};

class DetailedBlock extends Component {
  render() {
    const { props } = this;

    return (
      <div className="detailedBlock">

        <header>
          <div className="compare-wrap">
            <FacBlock title={ props.name } subtitle={ props.city } fac={ props.image } totEffect={ props.totEffect } solarPlants={ props.solarPlants }/>
            <Link to={`${c.PORTAL_ROOT}/locations/addCompare`} className="blockk add-block">+ ADD BLOCK</Link>
          </div>
        </header>

        <div className="content-detailedBlock">
            <LineBlock {...props.block} {...props} title={props.name} />
        </div>

        <footer>
        </footer>
      </div>
    );
  }
}

DetailedBlock.propTypes = {
  name:                     PropTypes.string.isRequired,
  city:                     PropTypes.string.isRequired,
  image:                    PropTypes.string.isRequired,
  totEffect:                PropTypes.number.isRequired,
  solarPlants:              PropTypes.number.isRequired,
  block:                    PropTypes.object.isRequired,
};

export default DetailedBlock;