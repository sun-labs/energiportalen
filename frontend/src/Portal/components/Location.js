import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../Splash/assets/APIRoutes';

import { Link } from 'react-router-dom';
import { ROOT } from './Portal';

// STYLE IMPORTS
import '../styles/Home.css';
import '../styles/Locations.css';

// COMPONENT IMPORTS
import FacBlock from './FacBlock';

//TODO GET DATA FROM DATABASE FOR EVERY LOCATION TO DISPLAY. MAYBE IMPLEMENT SUPPORT FOR NUMERS OF SOLAR CELL IN FACILITY?

class Location extends Component {

  constructor () {
    super()
    this.state = {
      locations:[] // ID, name, pic, desc, city
    }
  }

componentWillMount(){
  const token = localStorage.getItem('token');
  
  axios.get(API_URL+'/locations', { headers: {Authorization: token}}).then(Response => {
    let location = [];
    let responsData = Response.data.length;
    for (let i = 0; i < responsData; i++){
      let Id = Response.data[i].id;
      let Name = Response.data[i].name;
      let City = Response.data[i].city;
      let Desc = Response.data[i].description;
      let Image = Response.data[i].image;

      let LocLocation = {
        Id: Id, 
        Name: Name,
        City: City,
        Desc: Desc,
        Image: Image
      }

      location = location.concat(LocLocation);
    }
    this.setState({
      locations: location
    });
  })

} 

  render() {

  let content = [];
  let lengthLocations = this.state.locations.length;
  for (let i = 0; i < lengthLocations; i++){
    let location = this.state.locations[i];
    content = content.concat(<Link to={`${ROOT}/locations/` +  location.Id} key={location.Id}><FacBlock fac={location.Image} title={location.Name} subtitle={location.Desc} key={location.Id} /></Link>)
  }

    return (
        <div className="FacBlock-wrap">
          { content }
        </div>
    );
  }

}

export default Location;