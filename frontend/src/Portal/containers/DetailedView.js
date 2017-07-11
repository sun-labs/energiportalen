import React, { Component } from 'react';
import '../styles/Home.css';
import '../styles/DetailedView.css'
import DetailedBlock from '../components/DetailedBlock';
import { connect } from 'react-redux';
import actions from '../../actions';
import { bindActionCreators } from 'redux'

class DetailedView extends Component {
  componentWillMount(){
    const { props } = this;

    const id = props.match.params.locationID;

    if (props.locations.length < 1) {
      props.getLocation(id);
    }
  }

  render() {
    const { props } = this;
    const id = props.match.params.locationID;

    const location = props.locations.find((loc) => {
      return Number(loc.id) === Number(id);
    });

    return (
      <div className="content">
        { 
          location ?
          <DetailedBlock {...location} {...props} /> :
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...actions}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailedView);