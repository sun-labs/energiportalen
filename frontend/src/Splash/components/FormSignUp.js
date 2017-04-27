import React, { Component } from 'react';
import axios from 'axios';

import { API_SIGNUP, URL_TERMS } from '../assets/APIRoutes';
import '../styles/Section.css';

class FormSignUp extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordVerify: ''
    };

    this.passwordsMatch = this.passwordsMatch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  passwordsMatch() {
    return this.state.password === this.state.passwordVerify;
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.passwordsMatch()) {
      axios.post(API_SIGNUP, { email: this.state.email, password: this.state.password })
        .then((res) => {
          
          localStorage.setItem('token', res.data.token);
          // TODO redirect to portal maybe ?

        })
        .catch((error) => {
          console.log("error");
          this.props.showError('Error Received', error.toString());
        });
    } else {
      this.props.showError('passwords don\'t match', 'This is only to help you not to get locked out of your account.');
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    let { className } = this.props;
    return (
      <form className={ className ? className : '' } onSubmit={ this.handleSubmit }>
        <div className="placeholder-wrap">
          <p>e-mail</p>
          <input onChange={ this.handleChange } value={ this.state.email } type="email" name="email" placeholder="e-mail" tabIndex="4" required/>
        </div>
        <div className="placeholder-wrap">
          <p>password</p>
          <input onChange={ this.handleChange } value={ this.state.password } type="password" name="password" placeholder="password" tabIndex="5" required/>
        </div>
        <div className="placeholder-wrap">
          <p>verify password</p>
          <input onChange={ this.handleChange } value={ this.state.passwordVerify } type="password" name="passwordVerify" placeholder="verify password" tabIndex="6" required/>
        </div>
        <button tabIndex="7" >CREATE ACCOUNT</button>
        <p className="terms" >By clicking “CREATE ACCOUNT” you agree to our <a href={ URL_TERMS }>terms and agreements</a>.</p>
      </form>
    );
  }

}

export default FormSignUp;