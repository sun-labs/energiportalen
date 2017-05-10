import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { ROOT } from './Portal';

// STYLE IMPORTS
import '../styles/Home.css';

// COMPONENT IMPORTS
import LineBlock from './LineBlock';
import TableBlock from './TableBlock';
import IlluBlock from './IlluBlock';
import FacDashBlock from './DashboardLocations'
import AddBlock from './AddBlock';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      timestamps: [],
      title: [],
      name: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content">
        <Link to={`${ROOT}/addlocation`} className="blockk add-block">+ ADD LOCATION</Link>
        <div className="text-block">
          <h1>FAVORITE LOCATIONS<span className="inline-button"> add location + </span></h1>
          <h2> you may save or remove your own personally defined locations for easier access. </h2>
        </div>
        <FacDashBlock/>
        <Link to={`${ROOT}/addblock`} className="blockk add-block">+ ADD BLOCK</Link>
        <div className="text-block">
            <h1>blocks <span className="inline-button"> add block + </span></h1>
            <h2> These are your own personally defined blocks, you may add and remove as you like to customize your dashboard </h2>
        </div>
        <div className="block-wraper">
          <AddBlock/>
          <LineBlock title="Hello World" />
          <TableBlock />
          <IlluBlock value="5"/>
          <LineBlock/>
        </div>
      </div>
    );
  }

}

export default Home;