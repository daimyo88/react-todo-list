import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import tasksReducer from './store/reducers/tasksReducer';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  tsk : tasksReducer
});

// const logger = (store) =>  {
//     return next => {
//       return action => {
//         console.log('Middleware dispatching', action);
//         const result = next(action);
//         console.log('Middleware next state', store.getState());
//         return result;
//       }
//     }
// }

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
