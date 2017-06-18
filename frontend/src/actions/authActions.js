import axios from 'axios';
import { API_CHECK_TOKEN } from '../Splash/assets/APIRoutes';
import {
	AUTH_USER,
	UNAUTH_USER
} from '../constants/auth';

export function authToken(token, history) {
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