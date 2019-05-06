import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import rootReducer from './reducers'
import './index.css';
import App from './App';
import { Login } from './Login';
import About from './About';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/login/" component={Login} />
        <Route path="/about/" component={About} />
      </div>
    </Router>
  </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
