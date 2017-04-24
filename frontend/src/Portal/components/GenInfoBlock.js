import React from 'react';

import '../styles/GenInfoBlock.css';

const ph_Name = 'Akademiska sjukhuset';
const ph_Location = 'Uppsala';

const GenInfoBlock = ({ name = ph_Name, location = ph_Location }) => {
  return (
    <div className="block gen-info-block">

      <div className="header">
        <span className="name-location">
          <h3 className="name">{name}</h3>
          <p className="location">{location}</p>
        </span>
        <span className="edit">EDIT</span>
        
      </div>
      general info
    </div>
  );
}

export default GenInfoBlock;