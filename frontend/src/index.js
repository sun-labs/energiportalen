import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Splash from './Splash/components/Splash';
import Portal from './Portal/components/Portal';
import RequireAuth from './RequireAuth';

import './index.css';

const router = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={ Splash }></Route>
                <Route path="/portal" component={ RequireAuth(Portal) }></Route>
                <Route component={ Splash } />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(router, document.getElementById('root'));