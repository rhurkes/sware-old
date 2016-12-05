import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
import app from './ducks/app-duck';
import eventsConfig from './ducks/events-config-duck';
import events from './ducks/events-duck';
import spcMesoanalysis from './ducks/spc-mesoanalysis-duck';

const allReducers = combineReducers({
  app, eventsConfig, events, spcMesoanalysis,
});

const composedMiddleware = compose(applyMiddleware(thunkMiddleware));

export default createStore(allReducers, composedMiddleware);
