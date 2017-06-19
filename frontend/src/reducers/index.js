
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blocksReducer from './blocksReducer';

const portalApp = combineReducers({
  authReducer,
  blocksReducer
});

// const portalApp = (state = {}, action = null) => {
//   return state;
// }

export default portalApp;