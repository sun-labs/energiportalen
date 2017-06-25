import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import AddBlock from './AddBlock';
import TopNavBar from './TopNavBar';
import BotNavBar from './BotNavBar';
import Locations from '../containers/Locations';
import DetailedView from './DetailedView'

export const ROOT = '/portal';

class Portal extends Component {
  
  render() {
    return (
      <div id="portal">
        <TopNavBar />
          <Switch>
            <Route path={`${ROOT}/addblock`} component={ AddBlock } />
            <Route path={`${ROOT}/locations/:locationID`} component={ DetailedView } />
            <Route path={`${ROOT}/locations`} component={ Locations } />               
            <Route component={ Home } />
          </Switch>
        <BotNavBar/>
      </div>
    );
  }

}

export default Portal;