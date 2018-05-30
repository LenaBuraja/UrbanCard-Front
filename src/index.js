import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';

import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';

import reducers from './reducers';
import Routes from './routes';
import './assets/loader';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
	combineReducers({
		...reducers,
		router: routerReducer,
	}), applyMiddleware(
		thunkMiddleware,
		middleware,
	),
);

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<div>
				<Routes />
			</div>
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root'),
);
