
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import blocksReducer from './blocksReducer';
import locationsReducer from './locationsReducer';

const portalApp = combineReducers({
  authReducer,
  blocksReducer,
  locationsReducer
});

export default portalApp;