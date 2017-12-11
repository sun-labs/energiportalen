import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { authToken } from './actions/authActions';

export default function(ComposedComponent, auth = false) {
	class Authentication extends Component {
    constructor() {
      super();

      this.authenticate = this.authenticate.bind(this);
    }

    authenticate() {
      const {
        history,
        dispatch
      } = this.props;
      const token = localStorage.getItem('token');

      if (!token) {
        history.push('/');
        return;
      }

      dispatch(authToken(token, history));
    }

		componentWillMount() {
      this.authenticate();
		}

		componentWillUpdate() {
      const {
        authenticated
      } = this.props;
      if (!authenticated) {
        this.authenticate();
      }
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

  const mapStateToProps = (state) => ({
    authenticated: state.authReducer.authenticated
  })

  return connect(mapStateToProps)(withRouter(Authentication))

}