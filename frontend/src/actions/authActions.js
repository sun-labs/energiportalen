import axios from 'axios';
import * as APIroutes from '../Splash/assets/APIRoutes';
import * as errorMessages from '../Splash/assets/errorMessages';
import * as authConstants from '../constants/authConstants';
const c = {
  ...APIroutes,
  ...errorMessages,
  ...authConstants
};

export const showError = (title, error) => {
  return (dispatch) => {
    let body;

    if (typeof(error) === 'object') {
      if(error.response) {
        switch (error.response.status) {
          case 401:
            body = c.UNAUTHORIZED;
            break;
          default:
            body = c.UNKNOWN;
            break;
        }
      }
    }

    dispatch({ type: c.SHOW_ERROR, error: { title, body } })
  }
}

export const authToken = (token, history) => {
  return (dispatch) => {
    axios.get(c.API_CHECK_TOKEN, {
        headers: { authorization: token }
      })
      .then((res) => {

        dispatch({ type: c.AUTH_USER })

      })
      .catch((error) => {
        history.push('/');

        dispatch({ type: c.UNAUTH_USER })
      });
  }
}

export const authSignIn = ( email = '', password = '', history ) => {
  return (dispatch) => {

    axios.post(c.API_AUTH, { email, password })
      .then((res) => {

        console.log('success, setting token');
        localStorage.setItem('token', res.data.token);
        history.push('/portal');

        dispatch({ type: c.AUTH_USER })
      })
      .catch((error) => {
        dispatch({ type: c.UNAUTH_USER })
        dispatch(showError('Error Received', error))
        dispatch({ type: c.FAILED_SIGN_IN })
      });
  }
}

export const authSignUp = ( email = '', password = '', history ) => {
  return (dispatch) => {
    axios.post(c.API_SIGNUP, { email, password })
      .then((res) => {
        
        localStorage.setItem('token', res.data.token);
        history.push('/portal');

        dispatch({ type: c.AUTH_USER })
      })
      .catch((error) => {
        dispatch({ type: c.UNAUTH_USER })
        dispatch(showError('Error Received', error));
        dispatch({ type: c.FAILED_SIGN_UP })
      });
  }
}

export const passwordMismatch = () => {
  return (dispatch) => {
    dispatch({ type: c.PASSWORD_MISMATCH });
    dispatch(showError('passwords don\'t match', c.PASS_MATCH));
  }
}

export const closeAuthError = () => {
  return (dispatch) => {
    dispatch({ type: c.CLOSE_AUTH_ERROR })
  }
}