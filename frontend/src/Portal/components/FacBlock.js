import React from 'react';
import PropTypes from 'prop-types';
import img from '../../imgs/akademiska.png';
import '../styles/FacBlock.css';

const FacBlock = (props) => {

  return (
    <div className={`blockk fac-block ${props.className ? props.className : ''}`}>
        <div className="picture-wrap">
          <img className="img-circle" alt="" src={ props.fac }/>
        </div>
        <div className="description-fac-wrap">
          <p className="title">{ props.title }</p>
          <p className="subtitle">{ props.subtitle }</p>
        </div>

        <div className="info-fac-wrap">
          <div className="wrap-info solar-info">
            <p className="fac-info-text">Solar cells</p>
            <p className="solarPlants">{ props.solarPlants }</p>
          </div>
          <div className="wrap-info effect-info">
            <p className="fac-info-text">Effect (MWh)</p>
            <p className="totEffect">{ props.totEffect }</p>
          </div>

          <div className="info-fac-button">
           <button>Change location</button>
          </div>
        </div>
    </div>
  );
}

FacBlock.propTypes = {
  title:                PropTypes.string.isRequired,
  fac:                  PropTypes.string.isRequired,

  subtitle:             PropTypes.string,
  solarPlants:          PropTypes.number,
  totEffect:            PropTypes.number,
  className:            PropTypes.string,
};

export default FacBlock;