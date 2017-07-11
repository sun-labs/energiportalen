import * as authConstants from '../constants/authConstants';

const c = {
	...authConstants
};

const initialState = {
	authenticated: false,
	signInError: false,
	error: {}
}

const authReducer = (state = initialState, action = null) => {
	switch(action.type) {
		case c.AUTH_USER:
			return {
				...state,
				authenticated: true
			}
		case c.UNAUTH_USER:
			return {
				...state,
				authenticated: false
			}
		case c.PASSWORD_MISMATCH:
		case c.FAILED_SIGN_UP:
		case c.FAILED_SIGN_IN:
			return {
				...state,
				signInError: true,
			}
		case c.CLOSE_AUTH_ERROR:
			return {
				...state,
				signInError: false,
				error: {}
			}
		case c.SHOW_ERROR:
			return {
				signInError: true,
				error: {
					...action.error
				},
			}
		default:
			return state
	}
}

export default authReducer;