import fetchJsonp from '../lib/fetch-jsonp';
import store from '../store';
import { addLog, addNetworkLog } from '../ducks/app-duck';

function wrappedFetchJsonp(url, dataSource, pollingFunc) {
  let responseData;

  return fetchJsonp(url)
    .then((response) => {
      const fakeStatusCode = response.ok ? 200 : 500;

      store.dispatch(addNetworkLog(
        url, dataSource, fakeStatusCode, response.networkTime
      ));

      return response.json();
    })
    .then((response) => {
      responseData = response;
    })
    .catch((error) => {
      const logText = `Error while fetching ${url}: ${error.message}`;
      store.dispatch(addLog(logText, null, dataSource));
    })
    .then(() => {
      if (typeof pollingFunc === 'function') {
        return pollingFunc();
      }
      return null;
    })
    .then(() => (responseData));
}

export default {
  fetchJsonp: wrappedFetchJsonp,
};
