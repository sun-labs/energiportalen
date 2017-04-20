import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// COMPONENT IMPORTS
import Home from './Home';
import AddBlock from './AddBlock';
import TopNavBar from './TopNavBar';
import BotNavBar from './BotNavBar';

export const ROOT = '/portal';

class Portal extends Component {
  render() {
    
    return (
      <div id="portal">
        <TopNavBar />
          <Switch>
            <Route path={`${ROOT}/addblock`} component={ AddBlock } />   
            <Route component={ Home } />
          </Switch>
        <BotNavBar/>
      </div>
    );
  }

}

export default Portal;