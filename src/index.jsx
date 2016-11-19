import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './containers/app-container';
import Home from './components/home';
import Events from './containers/pages/events-container';
import EventsConfig from './containers/pages/events-config-container';
import store from './store';

/* Makes the Redux store available to the connect() calls in the component hierarchy below.
  Normally, you can’t use connect() without wrapping the root component in <Provider>.
  If you really need to, you can manually pass store as a prop to every connect()ed component,
  but we only recommend to do this for stubbing store in unit tests, or in non-fully-React
  codebases. Normally, you should just use <Provider>. */

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="events" component={Events} />
        <Route path="events-config" component={EventsConfig} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'));
