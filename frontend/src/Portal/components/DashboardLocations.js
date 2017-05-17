import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../Splash/assets/APIRoutes';
import { Link } from 'react-router-dom';
import { ROOT } from './Portal';

import addimg from '../../imgs/add-button.png';

// STYLE IMPORTS
import '../styles/Home.css';

// COMPONENT IMPORTS
import FacBlock from './FacBlock';


class DashboardLocations extends Component {

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

      let DashLocation = {
        Id: Id, 
        Name: Name,
        City: City,
        Desc: Desc,
        Image: Image
      }

      location = location.concat(DashLocation);

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
    content = content.concat(<Link to={`${ROOT}/locations/` + location.Id }><FacBlock fac={location.Image} title={location.Name} subtitle={location.City} key={location.Id} /></Link>);
  }
  content = content.concat(<Link to={`${ROOT}/locations/addlocation`}><FacBlock className="add-block" key={'addlocation'}  title={'Add location'} fac={ addimg }/></Link>);
    return (
        <div className="facblock-wrapper">
          { content }
        </div>
    );
  }

}

export default DashboardLocations;