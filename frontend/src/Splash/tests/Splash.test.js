import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FormAuth from '../components/FormAuth';
import FormSignUp from '../components/FormSignUp';
import MessageBox from '../components/MessageBox';
import NavBar from '../components/NavBar';
import Popup from '../components/Popup';
import Section from '../components/Section';
import Sections from '../components/Sections';
import Splash from '../containers/Splash';
import TextContent from '../components/TextContent';

const withRouter = (component) => {
  const div = document.createElement('div');  
  ReactDOM.render(<Router>{component}</Router>, div)
}

it('FormAuth renders without crashing', () => {
  withRouter(<FormAuth/>);
});

it('FormSignUp renders without crashing', () => {
  withRouter(<FormSignUp/>);
});
it('MessageBox renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MessageBox/>, div);
});

it('NavBar renders without crashing', () => {
  withRouter(<NavBar/>);
});
it('Popup renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Popup/>, div);
});

it('Section renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Section/>, div);
});
it('Sections renders without crashing', () => {
  withRouter(<Sections/>);
});

it('Splash renders without crashing', () => {
  withRouter(<Splash/>);
});
it('TextContent renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextContent/>, div);
});