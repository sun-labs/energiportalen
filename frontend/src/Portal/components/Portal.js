import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import AddBlock from './AddBlock';
import TopNavBar from './TopNavBar';
import BotNavBar from './BotNavBar';
import Locations from '../containers/Locations';
import DetailedView from '../containers/DetailedView'
import * as routeConstants from '../../constants/routeConstants';

const c = {
  ...routeConstants
};

class Portal extends Component {
  
  render() {
    return (
      <div id="portal">
        <TopNavBar />
          <Switch>
            <Route path={`${c.PORTAL_ROOT}/addblock`} component={ AddBlock } />
            <Route path={`${c.PORTAL_ROOT}/locations/:locationID`} component={ DetailedView } />
            <Route path={`${c.PORTAL_ROOT}/locations`} component={ Locations } />               
            <Route component={ Home } />
          </Switch>
        <BotNavBar/>
      </div>
    );
  }

}

export default Portal;