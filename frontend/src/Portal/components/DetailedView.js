import React, { Component } from 'react';
import '../styles/Home.css';
import '../styles/DetailedView.css'
import DetailedBlock from './DetailedBlock';
import { connect } from 'react-redux';
import actions from '../../actions';

class DetailedView extends Component {
  componentWillMount(){
    const { 
      locations, 
      dispatch,
      match
    } = this.props;

    const id = match.params.locationID;

    if (locations.length < 1) {
      dispatch(actions.getLocation(id));
    }
  }

  render() {
    const { 
      match, 
      locations = [] 
    } = this.props;
    const id = match.params.locationID;

    const location = locations.filter((loc) => {
      return Number(loc.id) === Number(id);
    })[0];

    return (
      <div className="content">
        { 
          location ?
          <DetailedBlock
            title={location.name}
            subtitle={location.city}
            key={location.id}
            image={location.image}
          /> :
          null
        }
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    locations: state.locationsReducer.locations
  }
}

export default connect(mapStateToProps)(DetailedView);