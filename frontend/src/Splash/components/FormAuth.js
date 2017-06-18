import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { authSignIn } from '../../actions/authActions';
import { API_FORGOT_PASSWORD } from '../assets/APIRoutes';

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

    const { history, dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(authSignIn(email, password, history));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { className } = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <form className={ className ? className : '' } onSubmit={ handleSubmit }>
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

export default connect()(withRouter(FormAuth));