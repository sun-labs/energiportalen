import React, { Component } from 'react';
import { API_SIGNUP } from '../assets/APIRoutes';
import FormGeneric from './FormGeneric';

class FormSignUp extends Component {

  handleSubmit(e) {
    e.preventDefault();
    console.log(`[SIGN] ${API_SIGNUP}`);
  }

  handleChange(e) {
    // TODO store in state
    console.log(`[SIGN][${e.target.name.toUpperCase()}] ${e.target.value}`);
  }

  render() {
    const className = this.props.className ? this.props.className : undefined;
    return(
      <FormGeneric className={ className } onSubmit={ this.handleSubmit } onChange={ this.handleChange }>
        { this.props.children }
      </FormGeneric>
    );
  }

}

export default FormSignUp;