import React, { Component } from 'react';
import '../styles/Home.css';
import '../styles/Locations.css';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router-dom';
import * as routeConstants from '../../constants/routeConstants';
import FacBlock from '../components/FacBlock';
import { bindActionCreators } from 'redux'

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
    const { locations } = this.props;

    return (
      <div className="content">
        <div className="text-block">
          <h1>LOCATIONS</h1>
          <h2> Search for solar facilities in sweden to compare and see how much energy that is produced. </h2>
        </div>
          <div className="FacBlock-wrap">
            {
              locations.map((location) => {
                return (
                  <Link 
                    to={`${c.PORTAL_ROOT}/locations/` +  location.id} key={location.id}>
                    <FacBlock 
                      fac={location.image} 
                      title={location.name} 
                      subtitle={location.description} 
                      key={location.id} />
                  </Link>
                );
              })
            }
          </div>          
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    locations: state.locationsReducer.locations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...actions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Locations);