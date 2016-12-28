import { timestamp } from '../helpers/datetime';
import config from '../config';
import { UPDATE_PARAMETER } from './spc-mesoanalysis-duck';

// SELECTORS

export const getPollingToggles = state => (state.app.polling);
export const getPages = state => (state.app.pages);
export const getLogLines = state => (state.app.logLines);
export const getGeolocation = state => (state.app.geolocation);
export const getStatusbarInfo = state => (state.app.statusbarInfo);

// ACTIONS

const TOGGLE_POLLING = 'sware/app/TOGGLE_POLLING';
const ADD_LOG = 'sware/app/ADD_LOG';
const UPDATE_STATUSBAR_INFO = 'sware/app/UPDATE_STATUSBAR_INFO';
export const ADD_NETWORK_LOG = 'sware/app/ADD_NETWORK_LOG';
export const NEW_GEOLOCATION = 'sware/app/NEW_GEOLOCATION';

export const initialState = {
  pages: ['/', '/events', '/events-config', '/spc-mesoanalysis'],
  logLines: [{ text: `[${timestamp()}] initializing SWARE...` }],
  statusbarInfo: '',
  networkLogLines: [],
  geolocation: {},
  polling: {
    // sigtor: { name: 'sigtor events', active: false },
    iem: { name: 'IEM events', active: false },
    /* satellite: { name: 'CoD Satellite', active: false },
    mesoanalysis: { name: 'SPC Meso analysis', active: false },
    cimss: { name: 'CIMSS Proving Ground', active: false },*/
  },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    // Status bar updates
    case UPDATE_PARAMETER:
      console.log(action);
      return { ...state, statusbarInfo: action.parameter.label };
    case TOGGLE_POLLING: {
      return {
        ...state,
        polling: {
          ...state.polling,
          [action.source]: {
            ...state.polling[action.source],
            active: !state.polling[action.source].active,
          }
        }
      };
    }
    case ADD_LOG: {
      const line = {
        text: `[${timestamp()}] ${action.text}`,
        color: action.color,
        source: action.source,
      };

      const logLines = state.logLines.length > config.APP_LOG_ENTRY_LIMIT - 1
        ? state.logLines.slice(state.logLines.length - config.APP_LOG_ENTRY_LIMIT)
        : state.logLines.slice();

      logLines.push(line);

      return { ...state, logLines };
    }
    case NEW_GEOLOCATION: {
      return { ...state, geolocation: action.geolocation };
    }
    case ADD_NETWORK_LOG: {
      const { url, dataSource, statusCode, networkTime } = action;
      const networkLogLines = state.networkLogLines.length > config.NETWORK_LOG_ENTRY_LIMIT - 1
        ? state.networkLogLines.slice(state.networkLogLines.length - config.NETWORK_LOG_ENTRY_LIMIT)
        : state.networkLogLines;

      networkLogLines.push({ url, dataSource, statusCode, networkTime });

      return { ...state, networkLogLines };
    }
    case UPDATE_STATUSBAR_INFO:
      return { ...state, statusbarInfo: action.information };
    default:
      return state;
  }
};

// ACTION CREATORS

export function addLog(text, color, source = undefined) {
  return { type: ADD_LOG, text, color, source };
}

export function togglePolling(source) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_POLLING, source });
  };
}

export function addNetworkLog(url, dataSource, statusCode, networkTime) {
  return (dispatch) => {
    dispatch({ type: ADD_NETWORK_LOG, url, dataSource, statusCode, networkTime });
  };
}

export function updateStatusbarInfo(information) {
  return (dispatch) => {
    dispatch({ type: UPDATE_STATUSBAR_INFO, information });
  };
}
