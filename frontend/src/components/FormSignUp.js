import React, { Component } from 'react';
import { API_SIGNUP } from '../assets/APIRoutes';

class FormSignUp extends Component {

  handleSubmit(e) {
    // TODO send ajax request to backend
    console.log(API_SIGNUP);
  }

  render() {
    const className = this.props.className ? this.props.className : undefined;
    return(
        <form className={ className } onSubmit={ this.handleSubmit }>
          { this.props.children }
        </form>
    );
  }

}

export default FormSignUp;