import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import { API_SIGNUP, URL_TERMS } from '../assets/APIRoutes';
import { PASS_MATCH } from '../assets/errorMessages';
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
          this.props.history.push('/portal');

        })
        .catch((error) => {
          console.log("error");
          this.props.showError('Error Received', error);
        });
    } else {
      this.props.showError('passwords don\'t match', PASS_MATCH); // TODO passwords dont match message
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

export default withRouter(FormSignUp);