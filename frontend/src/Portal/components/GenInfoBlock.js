import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/GenInfoBlock.css';

import TinyInfoBlock from './TinyInfoBlock';

const ph_Name = 'Akademiska sjukhuset';
const ph_Location = 'Uppsala';

const GenInfoBlock = ({ name = ph_Name, location = ph_Location }) => {
  return (
    <div className="block gen-info-block">

      <div className="header">
        <div className="name-location">
          <h3 className="name">{name} <span className="edit">EDIT</span> </h3>
          <p className="location">{location}</p>
        </div>
        

      </div>
      <div className="content-gen-block">

      <TinyInfoBlock/>

        <Link to="/">+ add information</Link>
      </div>
    </div>
  );
}

export default GenInfoBlock;