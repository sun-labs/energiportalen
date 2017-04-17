import React, { Component } from 'react';
import axios from 'axios';

import { API_AUTH } from '../assets/APIRoutes';
import FormGeneric from './FormGeneric';

class FormAuth extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_AUTH, this.state).then((value) => {
      console.log(value);
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let { className, children } = this.props;
    return (
      <FormGeneric className={ className ? className : '' } onSubmit={ this.handleSubmit.bind(this) } onChange={ this.handleChange.bind(this) }>
        { children }
      </FormGeneric>
    );
  }

}

export default FormAuth;