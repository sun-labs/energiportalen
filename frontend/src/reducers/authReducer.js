import {
	AUTH_USER,
	UNAUTH_USER,
	FAILED_SIGN_IN,
	CLOSE_AUTH_ERROR,
	SHOW_ERROR,
	FAILED_SIGN_UP,
	PASSWORD_MISMATCH
} from '../constants/authConstants';

const initialState = {
	authenticated: false,
	signInError: false,
	error: {}
}

const authReducer = (state = initialState, action = null) => {
	switch(action.type) {
		case AUTH_USER:
			return {
				...state,
				authenticated: true
			}
		case UNAUTH_USER:
			return {
				...state,
				authenticated: false
			}
		case PASSWORD_MISMATCH:
		case FAILED_SIGN_UP:
		case FAILED_SIGN_IN:
			return {
				...state,
				signInError: true,
			}
		case CLOSE_AUTH_ERROR:
			return {
				...state,
				signInError: false,
				error: {}
			}
		case SHOW_ERROR:
			return {
				error: {
					...action.error
				}
			}
		default:
			return state
	}
}

export default authReducer;