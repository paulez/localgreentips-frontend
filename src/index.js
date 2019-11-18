import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './configureStore';
import './index.css';
import App from './App';
import Login from './Login';
import Register from './Register';
import About from './About';
import TipPage from './TipPage';
import { AddTip } from './AddTip';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <div>
            <Route path="/" exact component={App} />
            <Route path="/login/" component={Login} />
            <Route path="/register/" component={Register} />
	    <Route path="/about/" component={About} />
	    <Route path="/tip/:index" component={TipPage} />
	    <Route path="/addtip/" component={AddTip} />
          </div>
        </Router>
      </PersistGate>
    </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
