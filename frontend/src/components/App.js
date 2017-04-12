import React, {Component} from 'react';
import '../styles/App.css';

import NavBar from './NavBar';
import Section1 from './Section1';
import Section2 from './Section2';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Section1/>
        <Section2/>
      </div>
    );
  }
}

export default App;
