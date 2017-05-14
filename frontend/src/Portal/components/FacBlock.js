import React from 'react';

import '../styles/FacBlock.css';
import img from '../../imgs/akademiska.png';

const Block = (props) => {

  const { 
    className = '',
    title = 'Origo',
    subtitle = 'Lorem ipsum dolores huota. Lorem ipsum dolores huota. Lorem ipsum dolores huota. Lorem ipsum dolores huota.',
    solarPlants = '158',
    totEffect = '340',
    // fac = img TODO remove comment when using real image
  } = props;

  return (
    <div className={`blockk fac-block ${className}`}>
      
    
        <div className="picture-wrap">
          <img className="img-circle" alt="" src={ img }/> {/*change back to { fac } to render image from DB*/}
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

          <div className="info-fac-button">
           <button>Change location</button> 
          </div>
        </div>



    </div>);
}

export default Block;