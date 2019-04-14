import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { PreAuthShell } from './components';
import { Home } from './components/landing';
import App from './App';

const Root = ({ store }) => (
    <Provider store={store}>
      <Router>
        <div>
            <Route path="/" component={App} />
            <Route path="/auth" component={PreAuthShell} />
            <Route path="/home" component={Home} />
        </div>
      </Router>
    </Provider>
);

export default Root;