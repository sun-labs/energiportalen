import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROOT } from './Portal';

import API from '../../API';
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

componentWillMount() {
  API.getLocations({}, (res) => {
    this.setState({
      locations: res.data.map((loc) => {
        return {
          Id: loc.id,
          Name: loc.name,
          City: loc.city,
          Desc: loc.description,
          Image: loc.image
        }
      })
    });
  });

} 

  render() {

    let blocks = this.state.locations.map((loc) => {
      return (
        <Link to={`${ROOT}/locations/` + loc.Id } key={loc.Id}>
          <FacBlock fac={loc.Image} title={loc.Name} subtitle={loc.City}/>
        </Link>
      );
    });
    blocks.push(<Link to={`${ROOT}/locations/addlocation`} key={'addlocation'}><FacBlock className="add-block" title={'Add location'} fac={ addimg }/></Link>);

    return (
        <div className="facblock-wrapper">
          { blocks }
        </div>
    );
  }

}

export default DashboardLocations;