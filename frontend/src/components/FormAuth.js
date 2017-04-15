import React, { Component } from 'react';
import { API_AUTH } from '../assets/APIRoutes';
import FormGeneric from './FormGeneric';

class FormAuth extends Component {

  handleSubmit(e) {
    e.preventDefault();
    console.log(`[AUTH] ${API_AUTH}`);
  }

  handleChange(e) {
    console.log(`[AUTH][${e.target.name.toUpperCase()}] ${e.target.value}`);
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

export default FormAuth;