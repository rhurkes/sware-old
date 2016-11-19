import { connect } from 'react-redux';
import { getMessages, updateMessagesTimeAgo } from '../../ducks/events-duck';
import Events from '../../components/pages/events';
import { getAllCWAsOn, getActiveCWAs, getTimeFilterMinutes } from '../../ducks/events-config-duck';

const mapStateToProps = (state) => {
  const activeCWAs = getActiveCWAs(state);
  const messages = getMessages(state);
  const now = Date.now();

  const filteredMessages = messages.filter((x) => {
    const passesWFOFilter = getAllCWAsOn(state) ||
      (x.details.wfo && activeCWAs.indexOf(x.details.wfo) > -1);

    const timeFilterMinutes = getTimeFilterMinutes(state);
    const passesTimeFilter = !timeFilterMinutes ||
      (x.tsUtc && (now - new Date(x.tsUtc).getTime() < 1000 * 60 * timeFilterMinutes));

    return (passesWFOFilter && passesTimeFilter);
  });

  // TODO unfilterable CWAs like SPC?
  return {
    messages: filteredMessages,
  };
};

const EventsContainer = connect(
  mapStateToProps,
  { getMessages, updateMessagesTimeAgo }
)(Events);

export default EventsContainer;
