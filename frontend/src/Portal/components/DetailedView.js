import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../Splash/assets/APIRoutes';

// STYLE IMPORTS
import '../styles/Home.css';
import '../styles/DetailedView.css'

// COMPONENT IMPORTS
import DetailedBlock from './DetailedBlock';

class DetailedView extends Component {

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
    let l1 = this.props.match.params.locationID - 1; 

      let content = [];
      let lengthLocations = this.state.locations.length;
      for (let i = 0; i < lengthLocations; i++){
        if(l1 === i){
            let location = this.state.locations[i];
            content = content.concat(<DetailedBlock  title={location.Name} subtitle={location.City} key={location.Id} image={location.Image} />) 
          }
          else{

          }
      }
    return (
      <div className="content">
        { content }
      </div>
    );
  }

}

export default DetailedView;