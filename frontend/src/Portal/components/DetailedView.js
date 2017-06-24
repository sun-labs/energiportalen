import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../../Splash/assets/APIRoutes';
import '../styles/Home.css';
import '../styles/DetailedView.css'
import DetailedBlock from './DetailedBlock';

class DetailedView extends Component {

  constructor() {
    super();
    this.state = {};
  }

componentWillMount(){
  const token = localStorage.getItem('token');
  
  axios.get(API_URL+'/locations/' + this.props.match.params.locationID, { headers: {Authorization: token}}).then(Response => {

      this.setState({
        ...Response.data
      });

  });

}

  render() {
    
    let content;
    if(this.state.id) {
      const location = this.state;
      content = <DetailedBlock title={location.name} subtitle={location.city} key={location.id} image={location.image} />;
    }
    return (
      <div className="content">
        { content }
      </div>
    );
  }

}

export default DetailedView;