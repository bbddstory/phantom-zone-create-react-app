import './css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/app';
import registerServiceWorker from './registerServiceWorker';

import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import masterReducer from './reducers/masterReducer';

// Create master store for all data
let masterStore = createStore(masterReducer, applyMiddleware(thunk));

// Log every state change
// NOTE: subscribe() returns a function for unregistering the listener
const unsubscribe = masterStore.subscribe(() =>
  console.log(masterStore.getState())
);

// Stop logging state changes
// unsubscribe()

ReactDOM.render(
    <HashRouter>
        <Provider store={masterStore}>
            <App />
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);

registerServiceWorker();
