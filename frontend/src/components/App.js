import React, {Component} from 'react';
import '../styles/App.css';
import logo from '../imgs/logo.png';

import NavBar from './NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>

        <div className="firstSection">
          <img src={logo} alt="Sun Labs logo"/>          
          <div className="background"></div>
        </div>

      </div>
    );
  }
}

export default App;
