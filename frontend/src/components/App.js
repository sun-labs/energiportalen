import React, {Component} from 'react';
import '../styles/App.css';

import NavBar from './NavBar';
import Section from './Section';
// import Section1 from './Section1';
// import Section2 from './Section2';

const placeholder = 'Data, right at your fingertips. Lorem Kasper Lirre Bacon. Lorem ipsum Lirre Bacon. Lorem ipsum Kasper Bacon. Lorem ipsum Kasper Lirre . Lorem ipsum Kasper Lirre Bacon. ';

const img1 = {type:'img', src: 'logo', alt:'Sun Labs logo', className:'logo'};
const button = {type: 'button', text:'CREATE ACCOUNT'};
const textContent = {type:'div', className:'textContent', h2:{type:'h2', text:'What is Energiportalen?'} , p:{type:'p', text:placeholder}};
const img2 = {type:'img', src: 'downButton', alt:'Down Button', className:'downButton'};
const div = {type:'div', className:'hill'}

const props = [img1, button, textContent, img2, div];


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
         <Section props={props}/>
      </div>
    );
  }
}

export default App;


