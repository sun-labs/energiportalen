import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { API_FORGOT_PASSWORD } from '../assets/APIRoutes';
import PropTypes from 'prop-types';

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

    const {
      history,
      authSignIn
    } = this.props;

    const {
      email,
      password
    } = this.state;

    authSignIn(email, password, history);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const {
      className
    } = this.props;

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

FormAuth.propTypes = {
  className:          PropTypes.string.isRequired,
  authSignIn:         PropTypes.func.isRequired,
  history:            PropTypes.object.isRequired,
};

export default withRouter(FormAuth);