import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import addimg from '../../imgs/add-button.png';
import FacBlock from './FacBlock';
import PropTypes from 'prop-types';
import * as routeConstants from '../../constants/routeConstants';
import '../styles/Home.css';

const c = {
  ...routeConstants
};

class DashboardLocations extends Component {
  componentWillMount() {
    const { props } = this;
    if (props.locations.length < 1) {
      props.getLocations();
    }
  }

  render() {
    const { locations } = this.props;

    const blocks = locations.map((loc) =>
      <Link to={`${c.PORTAL_ROOT}/locations/` + loc.id } key={loc.id}>
        <FacBlock fac={loc.image} title={loc.name} subtitle={loc.city} solarPlants={loc.solarPlants} totEffect={loc.totEffect}/>
      </Link>
    ).concat(
      <Link 
        to={`${c.PORTAL_ROOT}/locations/addlocation`} 
        key={'addlocation'}
      >
        <FacBlock 
          className="add-block" 
          title={'Add location'} 
          fac={ addimg }/>
      </Link>);

    return (
      <div className="facblock-wrapper">
        { blocks }
      </div>
    );
  }
}

DashboardLocations.propTypes = {
  locations: PropTypes.array.isRequired
};

export default DashboardLocations;