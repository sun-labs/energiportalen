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
    const { locations, getLocations } = this.props;
    if (locations.length < 1) {
      getLocations();
    }
  }

  render() {
    const { locations } = this.props;

    const blocks = locations.map((loc) =>
    <div className="fac-block-dash" key={loc.id}>
      <Link to={`${c.PORTAL_ROOT}/locations/` + loc.id }>
        <FacBlock fac={loc.image} name={loc.name} city={loc.city} solarPlants={loc.solarPlants} totEffect={loc.totEffect}/>
      </Link>
    </div>
    ).concat(
      <Link
        to={`${c.PORTAL_ROOT}/locations/addlocation`}
        key={'addlocation'}
      >
        <FacBlock
          className="add-block"
          name={'Add location'}
          fac={ addimg }/>
      </Link>);

    return (
      <div className="FacBlock-wrap-dash">
        { blocks }
      </div>
    );
  }
}

DashboardLocations.propTypes = {
  locations: PropTypes.array.isRequired
};

export default DashboardLocations;