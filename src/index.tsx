import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers, applyMiddleware, Action, CombinedState } from 'redux';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import homeScreenReducer from './redux/reducer/homeReducer'

const appReducer = combineReducers({
  homeScreenReducer: homeScreenReducer
});

const rootReducer = (state:any, action:any) => {
  return appReducer(state, action)
}

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
