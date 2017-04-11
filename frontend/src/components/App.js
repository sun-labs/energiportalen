import React, {Component} from 'react';
import '../styles/App.css';

import NavBar from './NavBar';
import Section1 from './Section1';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Section1/>
      </div>
    );
  }
}

export default App;
