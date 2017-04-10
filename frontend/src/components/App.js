import React, {Component} from 'react';
import logo from '../imgs/logo.svg';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Energiportalen</h2>
        </div>
        <p className="App-intro"></p>
      </div>
    );
  }
}

export default App;
