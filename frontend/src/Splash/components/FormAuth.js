import React, { Component } from 'react';
import axios from 'axios';

import { API_SIGNIN, API_FORGOT_PASSWORD } from '../assets/APIRoutes';

class FormAuth extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_SIGNIN, this.state)
    .then((res) => {
      console.log('success, setting token');
      localStorage.setItem('token', res.data.token);
    })
    .catch((error) => {
      this.props.showError('Error Received', error.toString());
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { className } = this.props;
    return (
      <form className={ className ? className : '' } onSubmit={ this.handleSubmit }>
        <div className="placeholder-wrap">
          <p>e-mail</p>
          <input type="email" name="email" tabIndex="1" onChange={ this.handleChange } />
        </div>
        <div className="placeholder-wrap">
          <p>password <a href={ API_FORGOT_PASSWORD }>forgot?</a></p>
          <input type="password" name="password" tabIndex="2" onChange={ this.handleChange } />
        </div>
        <button tabIndex="3">SIGN IN</button>
      </form>
    );
  }

}

export default FormAuth;