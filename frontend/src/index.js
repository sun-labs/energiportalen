import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
const store = configureStore();

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Splash from './Splash/components/Splash';
import Portal from './Portal/components/Portal';
import RequireAuth from './RequireAuth';

import './index.css';

const provider = (
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ Splash }></Route>
                    <Route path="/portal" component={ RequireAuth(Portal) }></Route>
                    <Route component={ Splash } />
                </Switch>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(provider, document.getElementById('root'));