import React, { Component } from 'react';
import '../styles/Home.css';
import '../styles/Locations.css';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import FacBlock from '../components/FacBlock';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

const c = {
  ...routeConstants
};

class Locations extends Component {
  componentWillMount() {
    if (this.props.locations.length < 1) {
      this.props.getLocations();
    }
  }

  render() {

    return (
      <div className="content">
        <div className="text-block">
          <h1>LOCATIONS</h1>
          <h2> Search for solar facilities in sweden to compare and see how much energy that is produced. </h2>
        </div>
          <div className="FacBlock-wrap">
            {
              props.locations.map((location) => {
                return (
                  <Link 
                    to={`${c.PORTAL_ROOT}/locations/` +  location.id} key={location.id}>
                    <FacBlock 
                      fac={location.image} 
                      title={location.name} 
                      subtitle={location.description} 
                      key={location.id}
                      solarPlants={location.solarPlants}
                      totEffect={location.totEffect} />
                  </Link>
                );
              })
            }
          </div>          
      </div>
    );
  }
}

Locations.propTypes = {
  locations: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
  return {
    locations: state.locationsReducer.locations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...actions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);