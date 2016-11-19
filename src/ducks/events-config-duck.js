const timeFilterIncrement = 10;
const timeFilterMinutesMax = 180;
const distanceFilterIncrement = 20;
const distanceFilterMilesMax = 200;

// SELECTORS
export const getAllCWAsOn = state => state.eventsConfig.allCWAsOn;
export const getActiveCWAs = state => state.eventsConfig.activeCWAs;
export const getTimeFilterMinutes = state => state.eventsConfig.timeFilterMinutes;
export const getDistanceFilterMiles = state => state.eventsConfig.distanceFilterMiles;

// ACTIONS
export const TOGGLE_ALL_CWAS_ON = 'sware/events-config/TOGGLE_ALL_CWAS_ON';
export const TOGGLE_ACTIVE_CWA = 'sware/events-config/TOGGLE_ACTIVE_CWA';
export const CHANGE_TIME_FILTER = 'sware/events-config/CHANGE_TIME_FILTER';
export const CHANGE_DISTANCE_FILTER = 'sware/events-config/CHANGE_DISTANCE_FILTER';

// REDUCERS
export const initialState = {
  allCWAsOn: true,
  activeCWAs: [],
  timeFilterMinutes: 0,
  distanceFilterMiles: 0,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_ALL_CWAS_ON:
      return {
        ...state, allCWAsOn: !state.allCWAsOn,
      };
    case TOGGLE_ACTIVE_CWA: {
      let updatedActiveCWAs = state.activeCWAs.slice();
      const cwaIndex = updatedActiveCWAs.indexOf(action.code);
      if (state.activeCWAs.indexOf(action.code) > -1) {
        updatedActiveCWAs.splice(cwaIndex, 1);
      } else {
        updatedActiveCWAs = updatedActiveCWAs.concat([action.code]);
      }

      return {
        ...state, activeCWAs: updatedActiveCWAs,
      };
    }
    case CHANGE_TIME_FILTER: {
      const timeFilterMinutes = action.delta === '+'
        ? state.timeFilterMinutes + timeFilterIncrement
        : state.timeFilterMinutes - timeFilterIncrement;

      if (timeFilterMinutes < 0 || timeFilterMinutes > timeFilterMinutesMax) {
        return state;
      }

      return {
        ...state, timeFilterMinutes,
      };
    }
    case CHANGE_DISTANCE_FILTER: {
      const distanceFilterMiles = action.delta === '+'
        ? state.distanceFilterMiles + distanceFilterIncrement
        : state.distanceFilterMiles - distanceFilterIncrement;

      if (distanceFilterMiles < 0 || distanceFilterMiles > distanceFilterMilesMax) {
        return state;
      }

      return {
        ...state, distanceFilterMiles,
      };
    }
    default:
      return state;
  }
};

// ACTION CREATORS
export function toggleAllCWAsOn() {
  return { type: TOGGLE_ALL_CWAS_ON };
}

export function toggleActiveCWA(code) {
  return { type: TOGGLE_ACTIVE_CWA, code };
}

export function changeTimeFilter(delta) {
  return { type: CHANGE_TIME_FILTER, delta };
}

export function changeDistanceFilter(delta) {
  return { type: CHANGE_DISTANCE_FILTER, delta };
}
