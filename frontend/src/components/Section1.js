
import React from 'react';

// IMG IMPORTS
import logo from '../imgs/logo.png';
import downButton from '../imgs/downButton.png';
import bigSun from '../imgs/bigSun.png';

const placeholder = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

export const section1 = () => {

  return(
    <div className="section section1">
      <div className="clouds"></div>
      <img className="logo" src={{ logo }} alt="Sun Labs Logo" />
      <button>CREATE ACCOUNT</button>
      <div className="text-content">
        <h2>What is energiportalen?</h2>
        <p>{{ placeholder }}</p>  
      </div>
      <img className="downButton" src={{ downButton }} alt="Down Button" />
      <div className="hill"></div>
    </div>
  );

}