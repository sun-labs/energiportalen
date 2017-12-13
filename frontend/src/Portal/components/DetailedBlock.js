import React, { Component } from 'react';
import '../styles/Home.css';
import '../styles/DetailedBlock.css'
import FacBlock from './FacBlock';
import LineBlock from './LineBlock';
import PropTypes from 'prop-types';

class DetailedBlock extends Component {
  render() {
    const {
      name,
      city,
      image,
      block,
      totEffect,
      solarPlants,
      fetchData,
      getLocations,
      fetchLocationData,
      id
    } = this.props;

    return (
      <div className="detailed-block">

        <header>
          <div className="compare-wrap">
            <FacBlock
              name={name}
              city={city}
              fac={image}
              totEffect={totEffect}
              solarPlants={solarPlants}/>
          </div>
        </header>

        <div className="content-detailed-block">
          <LineBlock
            {...block}
            name={name}
            fetchData={fetchData}
            getLocations={getLocations}
            fetchLocationData={fetchLocationData}
            locationId={id}
          />
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