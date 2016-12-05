import React from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import EventsConfig from '../../components/pages/events-config';
import cwas from '../../data/cwas';
import {
  getAllCWAsOn,
  getActiveCWAs,
  getTimeFilterMinutes,
  getDistanceFilterMiles,
  toggleAllCWAsOn,
  toggleActiveCWA,
  changeTimeFilter,
  changeDistanceFilter,
} from '../../ducks/events-config-duck';

/**
 * Converts true/false to active/inactive.
 */
function boolToActive(value) {
  return value ? 'Active' : 'Inactive';
}

function getTimeFilterLabel(value) {
  if (value < 10) {
    return 'Not Filtering';
  } else if (value < 60) {
    return `${value}m`;
  }

  const hours = `${Math.floor(value / 60)}h`;
  const minutes = value % 60;

  return minutes > 0
    ? `${hours} ${minutes}m`
    : `${hours}`;
}

function getDistanceFilterLabel(value) {
  return value === 0
    ? 'Not Filtering'
    : `${value} miles`;
}

function mapCWAsToList(allCWAsOn, activeCWAs) {
  if (allCWAsOn) { return null; }

  return cwas.map((x) => {
    const active = activeCWAs.indexOf(x.code) > -1;
    const activeLabel = boolToActive(active).toLowerCase();

    return (
      <li key={x.code} className="events-config-item">
        <div>{x.code} {x.name}, {x.st}</div>
        <button className={activeLabel} onClick={() => store.dispatch(toggleActiveCWA(x.code))}>
          {activeLabel}
        </button>
      </li>
    );
  });
}

const mapStateToProps = (state) => {
  const allCWAsOn = getAllCWAsOn(state);
  const activeCWAs = getActiveCWAs(state);
  const timeFilterLabel = getTimeFilterLabel(getTimeFilterMinutes(state));
  const distanceFilterLabel = getDistanceFilterLabel(getDistanceFilterMiles(state));

  return {
    allCWAsOn,
    activeCWAs,
    cwaList: mapCWAsToList(allCWAsOn, activeCWAs),
    timeFilterLabel,
    distanceFilterLabel,
  };
};

const EventsContainer = connect(
  mapStateToProps,
  { toggleAllCWAsOn, changeTimeFilter, changeDistanceFilter }
)(EventsConfig);

export default EventsContainer;
