import React, { Component } from 'react';
import axios from 'axios';

import { API_SIGNUP } from '../assets/APIRoutes';
import FormGeneric from './FormGeneric';

class FormSignUp extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordVerify: ''
    };
  }

  passwordsMatch() {
    console.log(this.state);
    return this.state.password === this.state.passwordVerify;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.passwordsMatch()) {
      axios.post(API_SIGNUP, this.state).then((value) => {
        console.log(value);
      });
    } else {
      // UX for passwords dont match.
    }
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

export default FormSignUp;