import React, { Component } from 'react';

// STYLE IMPORTS
import '../styles/App.css';

// COMPONENT IMPORTS
import NavBar from './NavBar';
import Section from './Section';

import { section1, section2, section3 } from '../assets/Sections';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
         <Section {...section1()} />
         <Section {...section2()} />
         <Section {...section3()} />         
      </div>
    );
  }
}

export default App;

