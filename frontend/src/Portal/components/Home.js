import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ROOT } from './Portal';

// STYLE IMPORTS
import '../styles/Home.css';

// COMPONENT IMPORTS
import LineBlock from './LineBlock';
import GenInfoBlock from './GenInfoBlock';

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

  componentDidMount() {
    /* ADD THE FOLLOWING TO USE REAL DATABASE DATA */
    // for (let i = 0; i < 3; i++) {
    //   axios.get(`http://localhost:4000/1/units/4/${85+i}`)
    //     .then((res) => {

    //       this.setState({
    //         data: [ ...this.state.data, { data: res.data.data.splice(1, res.data.data.length), label: 'what is it'} ],
    //         timestamps: [ ...this.state.timestamps, res.data.timestamps.splice(1, res.data.timestamps.length) ],
    //         title: [ ...this.state.title, 'data' ],
    //         name: [ ...this.state.name, 'Akademiska sjukhuset' ]
    //       })


    //     })
    //     .catch((err) => {
    //       console.log(err);
    //   });
    // }
  }

  render(){
    /* ADD THE FOLLOWING TO USE REAL DATABASE DATA */

    // const { data, timestamps, title, name } = this.state;

    // let props = [];

    // for (let i = 0; i < timestamps.length; i++ ) {
    //   props = [ 
    //     ...props, 
    //     { 
    //       data: [data[i]],
    //       labels: timestamps[i],
    //       title: title[i],
    //       name: name[i]
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
          <div className="text-block">
            <h1>blocks <span className="inline-button"> add block + </span></h1>
            <h2> These are your own personally defined blocks, you may add and remove as you like to customize your dashboard </h2>
          </div>
        <GenInfoBlock/>
        <LineBlock/>
        <LineBlock/>
        <LineBlock/>
        <LineBlock/> 
      </div>
    );
  }

}

export default Home;