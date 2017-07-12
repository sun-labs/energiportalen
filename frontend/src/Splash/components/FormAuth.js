import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { API_FORGOT_PASSWORD } from '../assets/APIRoutes';
import PropTypes from 'prop-types';

class FormAuth extends Component {

  constructor() {
    super();
    this.state = {
      email: 'user@sunlabs.se',
      password: '***REMOVED***'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const {
      props, state
    } = this;

    props.authSignIn(state.email, state.password, props.history);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { handleSubmit, handleChange, props } = this;

    return (
      <form className={ props.className ? props.className : '' } onSubmit={ handleSubmit }>
        <div className="placeholder-wrap">
          <p>e-mail</p>
          <input type="email" placeholder="e-mail" name="email" tabIndex="1" onChange={ handleChange } />
        </div>
        <div className="placeholder-wrap">
          <p>password <a href={ API_FORGOT_PASSWORD }>forgot?</a></p>
          <input type="password" placeholder="password" name="password" tabIndex="2" onChange={ handleChange } />
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