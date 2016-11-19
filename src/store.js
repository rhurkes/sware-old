import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
import app from './ducks/app-duck';
import eventsConfig from './ducks/events-config-duck';
import events from './ducks/events-duck';

const allReducers = combineReducers({
  app, eventsConfig, events,
});

const composedMiddleware = compose(applyMiddleware(thunkMiddleware));

export default createStore(allReducers, composedMiddleware);
