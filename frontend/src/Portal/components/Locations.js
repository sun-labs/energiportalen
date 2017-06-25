import React, { Component } from 'react';
import '../styles/Home.css';
import '../styles/Locations.css';
import Location from './Location';
import { connect } from 'react-redux';
import actions from '../../actions';

class Locations extends Component {
  componentWillMount() {
    if (this.props.locations.length < 1) {
      this.props.dispatch(actions.getLocations());
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
          {
            locations.map((location) => {
              return (
                <Location key={location.id} location={location}/>
              );
            })
          }
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    locations: state.blocksReducer.locations
  }
}

export default connect(mapStateToProps)(Locations);