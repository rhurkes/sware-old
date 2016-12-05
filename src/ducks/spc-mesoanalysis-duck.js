import { updateStatusbarInfo } from './app-duck';

// SELECTORS
export const getRefreshInterval = state => state.spcMesoanalysis.refreshInterval;
export const getTime = state => state.spcMesoanalysis.time;
export const getParameter = state => state.spcMesoanalysis.parameter;
export const getSector = state => state.spcMesoanalysis.sector;
export const getOverlays = state => state.spcMesoanalysis.overlays;
export const getUnderlay = state => state.spcMesoanalysis.underlay;

// ACTIONS
export const UPDATE_REFRESH_INTERVAL = 'sware/spcMesoanalysis/UPDATE_REFRESH_INTERVAL';
export const UPDATE_TIME = 'sware/spcMesoanalysis/UPDATE_TIME';
export const UPDATE_PARAMETER = 'sware/spcMesoanalysis/UPDATE_PARAMETER';
export const UPDATE_SECTOR = 'sware/spcMesoanalysis/UPDATE_SECTOR';
export const ADD_OVERLAY = 'sware/spcMesoanalysis/ADD_OVERLAY';
export const REMOVE_OVERLAY = 'sware/spcMesoanalysis/REMOVE_OVERLAY';
export const UPDATE_UNDERLAY = 'sware/spcMesoanalysis/UPDATE_UNDERLAY';

// REDUCERS
export const initialState = {
  refreshInterval: 5,
  time: '-0',
  parameter: { id: 'pmsl', label: 'MSL Pressure/Wind' },
  sector: 19,
  overlays: [],
  underlay: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_REFRESH_INTERVAL:
      return {
        ...state, refreshInterval: action.interval,
      }
    case UPDATE_TIME:
      return {
        ...state, time: action.time,
      };
    case UPDATE_PARAMETER:
      return {
        ...state, parameter: action.parameter,
      };
    case UPDATE_SECTOR:
      return {
        ...state, sector: action.sector,
      };
    case ADD_OVERLAY: {
      const overlays = state.mesoanalysis.overlays.indexOf(action.overlay) > -1
        ? state.mesoanalysis.overlays
        : state.mesoanalysis.overlays.concat(action.overlay);

      return {
        ...state, overlays,
      };
    }
    case REMOVE_OVERLAY: {
      // TODO finish
      return state;
    }
    case UPDATE_UNDERLAY:
      return {
        ...state, underlay: action.underlay,
      };
    default:
      return state;
  }
};

// ACTION CREATORS
export function updateRefreshInterval(interval) {
  return { type: UPDATE_REFRESH_INTERVAL, interval };
}

export function updateTime(time) {
  return { type: UPDATE_TIME, time };
}

export function updateParameter(id, label, desc) {
  return (dispatch) => {
    //updateStatusbarInfo(label);
    dispatch({ type: UPDATE_PARAMETER, parameter: { id, label, desc } });
  };
}

export function updateSector(sector) {
  return { type: UPDATE_SECTOR, sector };
}

export function addOverlay(overlay) {
  return { type: ADD_OVERLAY, overlay };
}

export function removeOverlay(overlay) {
  return { type: REMOVE_OVERLAY, overlay };
}

export function updateUnderlay(underlay) {
  return { type: UPDATE_UNDERLAY, underlay };
}
