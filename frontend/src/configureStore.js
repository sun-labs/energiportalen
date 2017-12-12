import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import portalApp from './reducers';

const configureStore = () => {
	const middlewares = [thunk];
	if (process.env.NODE_ENV !== 'production') {
		middlewares.push(createLogger());
	}

	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // redux devtools
	return createStore(portalApp, composeEnhancers( //composeEnhancers => redux devtools
		applyMiddleware(...middlewares)
	));
};

export default configureStore;