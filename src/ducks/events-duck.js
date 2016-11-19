import moment from 'moment';
import { getTimeAgo } from '../helpers/datetime';

// SELECTORS
export const getMessages = state => state.events.messages;

// ACTIONS
export const ADD_MESSAGES = 'sware/events/ADD_MESSAGES';
export const UPDATE_MESSAGES_TIMEAGO = 'sware/events/UPDATE_MESSAGES_TIMEAGO';

// REDUCERS

// visibleForTesting
export const initialState = {
  messages: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_MESSAGES: {
      const updatedMessages = action.messages.map(m => (
        Object.assign({}, {
          timeAgo: getTimeAgo(m.tsUtc),
          timeLabel: `${moment(m.tsUtc).format('HH:mm')}Z`,
        }, m)
      ));

      return {
        ...state, messages: state.messages.concat(updatedMessages),
      };
    }
    case UPDATE_MESSAGES_TIMEAGO: {
      const updatedMessages = state.messages.map((m) => {
        const newMessage = Object.assign({}, m);
        newMessage.timeAgo = getTimeAgo(m.tsUtc);

        return newMessage;
      });

      return {
        ...state, messages: updatedMessages,
      };
    }
    default:
      return state;
  }
};

// ACTION CREATORS
export function addMessages(messages) {
  return { type: ADD_MESSAGES, messages };
}

export function updateMessagesTimeAgo() {
  return { type: UPDATE_MESSAGES_TIMEAGO };
}
