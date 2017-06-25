import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AddBlock from '../components/AddBlock';
import Block from '../components/Block';
import BotNavBar from '../components/BotNavBar';
import Home from '../components/Home';
import LineBlock from '../components/LineBlock';
import Portal from '../containers/Portal';
import TableBlock from '../components/TableBlock';
import TinyInfoBlock from '../components/TinyInfoBlock';
import TopNavBar from '../components/TopNavBar';

global.CanvasRenderingContext2D = () => {}; // TODO find better solution for this 

const withRouter = (component) => {
  const div = document.createElement('div');  
  ReactDOM.render(<Router>{component}</Router>, div)
}

it('AddBlock renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddBlock/>, div);
});

it('Block renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Block/>, div);
});
it('BotNavBar renders without crashing', () => {
  withRouter(<BotNavBar/>);
});

it('Home renders without crashing', () => {
  withRouter(<Home/>);
});
it('LineBlock renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LineBlock/>, div);
});

it('Portal renders without crashing', () => {
  withRouter(<Portal/>);
});
it('TableBlock renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TableBlock/>, div);
});

it('TinyInfoBlock renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TinyInfoBlock/>, div);
});
it('TopNavBar renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TopNavBar/>, div);
});