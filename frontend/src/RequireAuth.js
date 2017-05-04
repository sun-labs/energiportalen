import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import { API_CHECK_TOKEN } from './Splash/assets/APIRoutes';

export default function(ComposedComponent) {
	class Authentication extends Component {
    constructor() {
      super();

      this.state = {
        checkedToken: false
      }

      this.authenticate = this.authenticate.bind(this);
    }

    authenticate() {
      const token = localStorage.getItem('token');

      if (!token) {
        this.props.history.push('/');
        return;
      }
      axios.get(API_CHECK_TOKEN, {
        headers: { authorization: token }
      })
      .then((res) => {
        this.setState({
          checkedToken: true
        })
      })
      .catch((error) => {
        this.props.history.push('/');
      });
    }

		componentWillMount() {
      this.authenticate();
		}

		componentWillUpdate() {
      if (!this.state.checkedToken) {
        this.authenticate();
      }
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}
  return withRouter(Authentication);
}