import React from 'react';
import '../styles/Section1.css';



const Section1 = () => {
  return (        
  <div className="section1">
    <img src={require('../imgs/logo.png')} alt="Sun Labs logo" className="logo"/>
    <button>CREATE ACCOUNT</button>

    <div className="textContent">
      <h2>What is Energiportalen?</h2>
      <p>Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. </p>
    </div>

    <img src={require('../imgs/downButton.png')} alt="Down Button" className="downButton"/>

    <div className="hill"></div>
  </div>
  );
}

export default Section1;


{
  img: {

  }

}