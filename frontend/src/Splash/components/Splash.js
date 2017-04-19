import React, { Component } from 'react';

// STYLE IMPORTS
import '../styles/App.css';

// COMPONENT IMPORTS
import NavBar from './NavBar';
import Sections from './Sections';
import MessageBox from './MessageBox';

class Splash extends Component {

  constructor() {
    super();
    this.state = {
      displayError: false,
      error: {
        title: 'title',
        body: 'body body body'
      }
    };
    this.handleErrorClose = this.handleErrorClose.bind(this);
    this.showError = this.showError.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  hideError() {
    this.setState({
      displayError: false
    });
  }

  showError(title, body) {
    this.setState({
      displayError: true,
      error: { title, body }
    })
  }

  handleErrorClose(e) {
    e.preventDefault();
    this.hideError();
  }

  render() {
    const uiProps = {
      showError: this.showError,
      hideError: this.hideError
    };
    return (
      <div id="Splash">
        <NavBar { ...uiProps } />
        { this.state.displayError && <MessageBox className="error" onClick={ this.handleErrorClose } { ...this.state.error } /> }
        <Sections { ...uiProps } />
      </div>
    );
  }

}

export default Splash;


