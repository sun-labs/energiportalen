import React, { Component } from 'react';
import PropTypes from 'prop-types';
import img from '../../imgs/akademiska.png';
import '../styles/FacBlock.css';

class FacBlock extends Component {
  render() {
    const {
      className,
      fac,
      name,
      city,
      solarPlants,
      totEffect
    } = this.props;

    return (
      <div className={`blockk fac-block ${className ? className : ''}`}>
          <div className="picture-wrap">
            <img className="img-circle" alt="" src={fac ? fac : img}/>
          </div>
          <div className="description-fac-wrap">
            <p className="name">{name}</p>
            <p className="city">{city}</p>
          </div>

          <div className="info-fac-wrap">
            <div className="wrap-info solar-info">
              <p className="fac-info-text">Solar cells</p>
              <p className="solarPlants">{solarPlants}</p>
            </div>
            <div className="wrap-info effect-info">
              <p className="fac-info-text">Effect (MWh)</p>
              <p className="totEffect">{totEffect}</p>
            </div>
          </div>
      </div>
    );
  }
}

FacBlock.propTypes = {
  name:                PropTypes.string.isRequired,
  fac:                  PropTypes.string.isRequired,

  city:             PropTypes.string,
  solarPlants:          PropTypes.number,
  totEffect:            PropTypes.number,
  className:            PropTypes.string,
};

export default FacBlock;