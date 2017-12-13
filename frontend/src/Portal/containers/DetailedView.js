import React, { Component } from 'react';
import '../styles/Home.css';
import '../styles/DetailedView.css'
import DetailedBlock from '../components/DetailedBlock';
import { connect } from 'react-redux';
import actions from '../../actions';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';

class DetailedView extends Component {
  componentWillMount(){
    const {
      match,
      locations,
      getLocation
    } = this.props;

    const id = match.params.locationID;

    if (locations.length < 1) {
      getLocation(id);
    }
  }

  render() {
    const {
      match,
      locations,
      fetchData,
      getLocations,
      fetchLocationData,
    } = this.props;
    const id = match.params.locationID;

    const location = locations.find((loc) => {
      return Number(loc.id) === Number(id);
    });

    return (
      <div className="content">
        { location ?
          <DetailedBlock
            id={location.id}
            name={location.name}
            city={location.city}
            image={location.image}
            block={location.block}
            totEffect={location.totEffect}
            solarPlants={location.solarPlants}
            fetchData={fetchData}
            getLocations={getLocations}
            fetchLocationData={fetchLocationData}
          /> :
          null }
      </div>
    );
  }
}

DetailedView.propTypes = {
  match:                    PropTypes.object.isRequired,
  locations:                PropTypes.array.isRequired,
  getLocation:              PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    locations: state.locationsReducer.locations
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...actions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);