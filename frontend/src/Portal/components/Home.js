import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ROOT } from './Portal';

// STYLE IMPORTS
import '../styles/Home.css';

// COMPONENT IMPORTS
import LineBlock from './LineBlock';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      timestamps: [],
      title: [],
      location: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    /* ADD THE FOLLOWING TO USE REAL DATABASE DATA */
    // for (let i = 0; i < 3; i++) {
    //   axios.get(`http://localhost:4000/1/units/4/${85+i}`)
    //     .then((res) => {

    //       this.setState({
    //         data: [ ...this.state.data, { data: res.data.data.splice(1, res.data.data.length), label: 'what is it'} ],
    //         timestamps: [ ...this.state.timestamps, res.data.timestamps.splice(1, res.data.timestamps.length) ],
    //         title: [ ...this.state.title, 'data' ],
    //         location: [ ...this.state.location, 'Akademiska sjukhuset' ]
    //       })


    //     })
    //     .catch((err) => {
    //       console.log(err);
    //   });
    // }
  }

  render(){
    /* ADD THE FOLLOWING TO USE REAL DATABASE DATA */

    // const { data, timestamps, title, location } = this.state;

    // let props = [];

    // for (let i = 0; i < timestamps.length; i++ ) {
    //   props = [ 
    //     ...props, 
    //     { 
    //       data: [data[i]],
    //       labels: timestamps[i],
    //       title: title[i],
    //       location: location[i]
    //     }
    //   ]
    // }

    return (
      <div className="content">
        <Link to={`${ROOT}/addblock`} className="add-block block">+ ADD BLOCK</Link>

        {/* ADD THE FOLLOWING TO USE REAL DATABASE DATA */}
        {/*{ props.map((item, index) => {
            return ( 
              <LineBlock key={index} {...item} />
            );
          }) 
        }*/}

        <LineBlock/>
        <LineBlock/>
        <LineBlock/>
        <LineBlock/>        
      </div>
    );
  }

}

export default Home;