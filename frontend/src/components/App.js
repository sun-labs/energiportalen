import React from 'react';

// STYLE IMPORTS
import '../styles/App.css';

// COMPONENT IMPORTS
import NavBar from './NavBar';
import Sections from './Sections';

const App = () => {
  return (
    <div className="App">
      <NavBar/>
      <Sections/>
    </div>
  );
}

export default App;


