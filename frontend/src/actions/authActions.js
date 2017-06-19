import axios from 'axios';
import { 
  API_CHECK_TOKEN, 
  API_AUTH, 
  API_SIGNUP 
} from '../Splash/assets/APIRoutes';
import { 
  UNAUTHORIZED, 
  UNKNOWN,
  PASS_MATCH
} from '../Splash/assets/errorMessages';
import {
	AUTH_USER,
	UNAUTH_USER,
  FAILED_SIGN_IN,
  CLOSE_AUTH_ERROR,
  SHOW_ERROR,
  FAILED_SIGN_UP,
  PASSWORD_MISMATCH
} from '../constants/auth';

export const showError = (title, error) => {
  return (dispatch) => {
    let body;

    if (typeof(error) === 'object') {
      if(error.response) {
        switch (error.response.status) {
          case 401:
            body = UNAUTHORIZED;
            break;
          default:
            body = UNKNOWN;
            break;
        }
      }
    }

    dispatch({ type: SHOW_ERROR, error: { title, body } })
  }
}

export const authToken = (token, history) => {
  return (dispatch) => {
    axios.get(API_CHECK_TOKEN, {
        headers: { authorization: token }
      })
      .then((res) => {

        dispatch({ type: AUTH_USER })

      })
      .catch((error) => {
        history.push('/');

        dispatch({ type: UNAUTH_USER })
      });
  }
}

export const authSignIn = ( email = '', password = '', history ) => {
  return (dispatch) => {

    axios.post(API_AUTH, { email, password })
      .then((res) => {

        console.log('success, setting token');
        localStorage.setItem('token', res.data.token);
        history.push('/portal');

        dispatch({ type: AUTH_USER })
      })
      .catch((error) => {
        dispatch({ type: UNAUTH_USER })
        dispatch(showError('Error Received', error))
        dispatch({ type: FAILED_SIGN_IN })
      });
  }
}

export const authSignUp = ( email = '', password = '', history ) => {
  return (dispatch) => {
    axios.post(API_SIGNUP, { email, password })
      .then((res) => {
        
        localStorage.setItem('token', res.data.token);
        history.push('/portal');

        dispatch({ type: AUTH_USER })
      })
      .catch((error) => {
        dispatch({ type: UNAUTH_USER })
        dispatch(showError('Error Received', error));
        dispatch({ type: FAILED_SIGN_UP })
      });
  }
}

export const passwordMismatch = () => {
  return (dispatch) => {
    dispatch({ type: PASSWORD_MISMATCH });
    dispatch(showError('passwords don\'t match', PASS_MATCH));
  }
}

export const closeAuthError = () => {
  return (dispatch) => {
    dispatch({ type: CLOSE_AUTH_ERROR })
  }
}