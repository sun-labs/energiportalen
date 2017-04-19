import React, { Component } from 'react';

// STYLE IMPORTS
import '../styles/Portal.css';

// COMPONENT IMPORTS
import TopNavBar from './TopNavBar';
import BotNavBar from './BotNavBar';
import AddBlock from './AddBlock';
import Block from './Block';

class Portal extends Component {

  render() {
    return (
      <div id="Portal">
        <TopNavBar />

        <div className="content">
          <AddBlock/>
          <Block/>
        </div>

        <BotNavBar/>
      </div>
    );
  }

}

export default Portal;


