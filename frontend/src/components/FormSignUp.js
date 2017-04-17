import React, { Component } from 'react';
import axios from 'axios';

import { API_SIGNUP } from '../assets/APIRoutes';

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
    return this.state.password === this.state.passwordVerify;
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.passwordsMatch()) {
      axios.post(API_SIGNUP, this.state).then((value) => {
        console.log(value);
      });
    } else {
      // UX for passwords dont match.
    }
  }

  handleChange(e) {
    console.log(this.passwordsMatch());
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let { className } = this.props;
    return (
      <form className={ className ? className : '' } onSubmit={ this.handleSubmit.bind(this) }>
        <div className="placeholder-wrap">
          <p>e-mail</p>
          <input onChange={ this.handleChange.bind(this) } value={ this.state.email } type="email" name="email" placeholder="e-mail" tabIndex="4" />
        </div>
        <div className="placeholder-wrap">
          <p>password</p>
          <input onChange={ this.handleChange.bind(this) } value={ this.state.password } type="password" name="password" placeholder="password" tabIndex="5" />
        </div>
        <div className="placeholder-wrap">
          <p>verify password</p>
          <input onChange={ this.handleChange.bind(this) } value={ this.state.passwordVerify } type="password" name="passwordVerify" placeholder="verify password" tabIndex="6" />
        </div>
        <button>CREATE ACCOUNT</button>
      </form>
    );
  }

}

export default FormSignUp;