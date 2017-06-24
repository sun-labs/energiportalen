import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROOT } from './Portal';
import addimg from '../../imgs/add-button.png';
import '../styles/Home.css';
import FacBlock from './FacBlock';


class DashboardLocations extends Component {
  componentWillMount() {
    if (this.props.locations.length < 1) {
      const { dispatch, blockActions } = this.props;
      dispatch(blockActions.getLocations());
    }
  }

  render() {
    const { locations } = this.props;

    const blocks = locations.map((loc) =>
      <Link to={`${ROOT}/locations/` + loc.id } key={loc.id}>
        <FacBlock fac={loc.image} title={loc.name} subtitle={loc.city}/>
      </Link>
    ).concat(
      <Link 
        to={`${ROOT}/locations/addlocation`} 
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

export default DashboardLocations;