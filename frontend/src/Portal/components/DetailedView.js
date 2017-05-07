import React, { Component } from 'react';

// STYLE IMPORTS
import '../styles/Home.css';
import '../styles/DetailedView.css'

// COMPONENT IMPORTS
import DetailedBlock from './DetailedBlock';

class DetailedView extends Component {

  render() {
    return (
      <div className="content">
        <DetailedBlock/>
      </div>
    );
  }

}

export default DetailedView;