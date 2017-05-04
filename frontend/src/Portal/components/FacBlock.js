import React from 'react';

// import '../styles/Block.css';
import '../styles/FacBlock.css';
import img from '../../imgs/akademiska.png';

const Block = (props) => {

  const { 
    className = '',
    title = 'Origo',
    subtitle = 'Lorem ipsum dolores huota. Lorem ipsum dolores huota. Lorem ipsum dolores huota. Lorem ipsum dolores huota.',
    solarPlants = '158',
    totEffect = '340',
    fac = img
  } = props;

  return (
    <div className={`blockk fac-block ${className}`}>
      
    
        <div className="picture-wrap">
          <img className="img-circle" alt="Facility" src={ fac }/>
        </div>
        <div className="description-fac-wrap">
          <p className="title">{ title }</p>
          <p className="subtitle">{ subtitle }</p>
        </div>

        <div className="info-fac-wrap">
          <div className="wrap-info solar-info">
            <p className="fac-info-text">Solar cells</p>
            <p className="solarPlants">{ solarPlants }</p>
          </div>
          <div className="wrap-info effect-info">
            <p className="fac-info-text">Effect (MWh)</p>
            <p className="totEffect">{ totEffect }</p>
          </div>
        </div>



    </div>);
}

export default Block;