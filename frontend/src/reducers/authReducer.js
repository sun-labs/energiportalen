import {
	AUTH_USER,
	UNAUTH_USER
} from '../constants/auth';

const authReducer = (state = {}, action) => {
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
		default:
			return state
	}
}

export default authReducer;