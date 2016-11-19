import React from 'react';
import Card from '../card';

// TODO abstract out page component
const EventsConfig = props => (
  <div className="page">
    <Card title="Filter by time">
      <div className="events-config-item">
        <div>
          <span>{props.timeFilterLabel}</span>
        </div>
        <div>
          <button className="large" onClick={() => props.changeTimeFilter('+')}>+</button>
          <button className="large" onClick={() => props.changeTimeFilter('-')}>-</button>
        </div>
      </div>
    </Card>
    <Card title="Filter by distance">
      <div className="events-config-item">
        <div>
          <span>{props.distanceFilterLabel}</span>
        </div>
        <div>
          <button className="large" onClick={() => props.changeDistanceFilter('+')}>+</button>
          <button className="large" onClick={() => props.changeDistanceFilter('-')}>-</button>
        </div>
      </div>
    </Card>
    <Card title="County Warning Areas">
      <ol>
        <li className="events-config-item parent">
          <div>All CWAs Active:</div>
          <button onClick={() => props.toggleAllCWAsOn()}>
            {props.allCWAsOn.toString()}
          </button>
        </li>
        {props.cwaList}
      </ol>
    </Card>
  </div>
);

export default EventsConfig;

EventsConfig.propTypes = {
  allCWAsOn: React.PropTypes.bool,
  cwaList: React.PropTypes.node,
  toggleAllCWAsOn: React.PropTypes.func,
  timeFilterLabel: React.PropTypes.string,
  distanceFilterLabel: React.PropTypes.string,
};
