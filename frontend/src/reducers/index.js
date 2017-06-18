
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const portalApp = combineReducers({
  authReducer
});

// const portalApp = (state = {}, action = null) => {
//   return state;
// }

export default portalApp;