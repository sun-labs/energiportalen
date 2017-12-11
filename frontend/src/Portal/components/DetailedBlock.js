import React, { Component } from 'react';
import '../styles/Home.css';
import '../styles/DetailedBlock.css'
import FacBlock from './FacBlock';
import LineBlock from './LineBlock';
import PropTypes from 'prop-types';

class DetailedBlock extends Component {
  render() {
    const { props } = this;

    return (
      <div className="detailed-block">

        <header>
          <div className="compare-wrap">
            <FacBlock title={ props.name } subtitle={ props.city } fac={ props.image } totEffect={ props.totEffect } solarPlants={ props.solarPlants }/>
          </div>
        </header>

        <div className="content-detailed-block">
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