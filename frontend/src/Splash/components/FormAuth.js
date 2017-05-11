import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import { API_AUTH, API_FORGOT_PASSWORD } from '../assets/APIRoutes';

class FormAuth extends Component {

  constructor() {
    super();
    this.state = {
      email: 'asdf@asdf.com',
      password: '***REMOVED***'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(API_AUTH);
    axios.post(API_AUTH, this.state)
    .then((res) => {
      console.log('success, setting token');
      localStorage.setItem('token', res.data.token);
      this.props.history.push('/portal');
    })
    .catch((error) => {
      this.props.showError('Error Received', error);
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
          <input type="email" placeholder="e-mail" name="email" tabIndex="1" onChange={ this.handleChange } />
        </div>
        <div className="placeholder-wrap">
          <p>password <a href={ API_FORGOT_PASSWORD }>forgot?</a></p>
          <input type="password" placeholder="password" name="password" tabIndex="2" onChange={ this.handleChange } />
        </div>
        <button tabIndex="3">SIGN IN</button>
      </form>
    );
  }

}

export default withRouter(FormAuth);