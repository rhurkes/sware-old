import React from 'react';
import store from '../store';
import config from '../config';
import { addLog, NEW_GEOLOCATION } from '../ducks/app-duck';

let geolocationTimer;

export function updateLocation() {
  const options = {
    enableHighAccuracy: true,
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude, accuracy } = position.coords;
      store.dispatch(addLog(`updating geolocation to ${latitude}, ${longitude} (${accuracy}m accuracy)`));
      store.dispatch({ type: NEW_GEOLOCATION, geolocation: position.coords });
      geolocationTimer = setTimeout(updateLocation, config.GEOLOCATION_UPDATE_INTERVAL);
    }, null, options);
  } else {
    store.dispatch(addLog('unable to query geolocation - stopping retries'));
  }
}

export default class GeolocationContainer extends React.Component {
  componentDidMount() {
    updateLocation();
  }

  componentWillUnmount() {
    clearInterval(geolocationTimer);
  }

  render() { return false; }
}
