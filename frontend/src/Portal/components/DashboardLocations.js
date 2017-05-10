import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../Splash/assets/APIRoutes';

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
    var location = [];
    var responsData = Response.data.length;
    for (var i = 0; i < responsData; i++){
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

      location.push(DashLocation);
    }
    this.setState({
      locations: location
    });
  })

} 

  render() {

  let content = [];
  let lengthLocations = this.state.locations.length;
  for (var i = 0; i < lengthLocations; i++){
    let location = this.state.locations[i];
    content.push(<FacBlock fac={location.Image} title={location.Name} key={location.Id} />)
  }

//kör loop för alla this.state.locations
//en tom array med FacBlock

    return (
        <div className="facblock-wrapper">
          { content }
        </div>
    );
  }

}

export default DashboardLocations;