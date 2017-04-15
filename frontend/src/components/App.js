import React from 'react';

// STYLE IMPORTS
import '../styles/App.css';

// COMPONENT IMPORTS
import NavBar from './NavBar';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';

const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}

export default App;


