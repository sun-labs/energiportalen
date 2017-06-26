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
      const token = localStorage.getItem('token');

      if (!token) {
        this.props.history.push('/');
        return;
      }

      const { dispatch, history } = this.props;
      dispatch(authToken(token, history));
    }

		componentWillMount() {
      this.authenticate();
		}

		componentWillUpdate() {
      if (!this.props.authenticated) {
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