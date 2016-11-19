import React from 'react';
import network from '../helpers/network';
import store from '../store';
import config from '../config';
import { addLog } from '../ducks/app-duck';
import { addMessages } from '../ducks/events-duck';

const SOURCE = 'iem';
const FETCHING = 'sware/iem/FETCHING';
const PARSE_ERROR = 'sware/iem/PARSE_ERROR';

const tmpElement = document.createElement('tmp');
let iemTimer;
let sequence = 0;

export function parseHTML(html) {
  tmpElement.innerHTML = html;

  return {
    text: tmpElement.textContent,
    link: tmpElement.getElementsByTagName('a')[0],
  };
}

export function formatIemMessage(data) {
  /* eslint-disable camelcase */
  if (!data || !data.message || !data.ts) { return null; }

  const { message, product_id, ts } = data;
  const details = {};

  if (!product_id) {
    if (message.indexOf('pilot report') > -1) { return null; } // Ignore pilot reports
    if (message.indexOf('Climate Report') > -1) { return null; } // Ignore climate reports
    if (message.indexOf('issues SIGMET') > -1) { return null; } // Ignore issues SIGMET

    // ASOS reports have extra whitespace and sometimes have status messages so we need a regex
    if (/ASOS.+reports/.test(message)) { return null; }
  } else {
    const product = product_id.split('-');

    if (product[3] !== null && product[3].length >= 3) {
      const code = product[3].substring(0, 3).toLowerCase();
      details.code = code;
      details.wfo = product[3].substring(3).toLowerCase();

      if (code === 'lsr' && message.indexOf('Summary Local Storm Report') > -1) { return null; }

      const parsedHTML = parseHTML(message);
      details.text = parsedHTML.text
        .replace(`(${code})`, '')
        .replace(' (View text)', '')
        .trim();
      details.link = parsedHTML.link;
    }
  }

  console.log(data);

  return {
    details,
    source: SOURCE,
    tsUtc: `${ts.replace(' ', 'T')}Z`,
    coords: undefined,
  };
  /* eslint-enable camelcase */
}

export function fetchData() {
  store.dispatch({ type: FETCHING });
  const url = config.IEM_POLLING_URL.replace('{seq}', sequence);
  const timerFunc = () => {
    iemTimer = setTimeout(fetchData, config.IEM_POLLING_INTERVAL_MS);
  };

  network.fetchJsonp(url, SOURCE, timerFunc)
    .then((response) => {
      const { messages } = response;

      if (messages && messages.length) {
        store.dispatch(addLog(`Recieved ${messages.length} new messages`, null, SOURCE));
        sequence = messages[messages.length - 1].seqnum;

        const formattedMessages = messages
          .map(formatIemMessage)
          .filter(x => x != null);

        if (formattedMessages.length) {
          store.dispatch(addMessages(formattedMessages));
        }
      }
    })
    .catch(error => store.dispatch({
      type: PARSE_ERROR,
      message: error.message,
    }));
}

export default class IEMContainer extends React.Component {
  componentDidMount() {
    fetchData();
    store.dispatch(addLog(`started polling for ${SOURCE}`));
  }

  componentWillUnmount() {
    clearInterval(iemTimer);
    store.dispatch(addLog(`stopped polling for ${SOURCE}`));
  }

  render() { return false; }
}
