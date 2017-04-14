
import React, { Component } from 'react';
import Section, { placeholder } from './Section.js';

import '../styles/Section3.css';

import bigSun from '../imgs/bigSun.png';

class Section3 extends Component {

  render() {
    return(
      <Section className="section3">
        <div className="text-content">
          <h2>What is energiportalen?</h2>
          <p>{ placeholder }</p>  
        </div>
        <img className="bigSun" src={ bigSun } alt="Big Sun" />
      </Section>
    );
  }

}

export default Section3;