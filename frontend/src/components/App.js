import React, { Component } from 'react';

// STYLE IMPORTS
import '../styles/App.css';

// COMPONENT IMPORTS
import NavBar from './NavBar';
import Section from './Section';
// import Section1 from './Section1';


import { section1, section2, section3, section4 } from '../assets/Sections';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
         {/*<Section1 />*/}
         <Section {...section1()} />
         <Section {...section2()} />
         <Section {...section3()} />
         <Section {...section4()} />            
      </div>
    );
  }
}

export default App;


