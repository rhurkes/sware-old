import React from 'react';
import { scrollToBottom } from '../../helpers/dom';

const eventsTimerInterval = 30 * 1000;
let eventsTimer;

const Line = (props) => {
  const { source, timeAgo, details } = props.message;
  const { code, text, link } = details;
  const classes = code;

  return (
    <li className={classes}>
      <div className="line-left">
        <div className="line-icon" />
        <div className="line-body">
          <a
            className="line-source" rel="noopener noreferrer"
            target="_blank" href={link}
          >[{source}]</a>
          <span className="line-text">{text}</span>
        </div>
      </div>
      <div className="line-right">
        <div className="line-timeago">{timeAgo}</div>
      </div>
    </li>
  );
};

class Events extends React.Component {
  componentDidMount() {
    scrollToBottom();
    eventsTimer = setInterval(() => {
      this.props.updateMessagesTimeAgo();
    }, eventsTimerInterval);
  }

  componentDidUpdate() {
    // scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(eventsTimer);
  }

  render() {
    const lines = this.props.messages.map((message, index) => (
      <Line key={index} message={message} />
    ));

    return (
      <div className="page">
        <ol id="events">
          {lines}
        </ol>
      </div>
    );
  }
}

/* Line.propTypes = {
  code: React.PropTypes.string,
  text: React.PropTypes.string,
  wfo: React.PropTypes.string,
  tsUtc: React.PropTypes.string,
  source: React.PropTypes.string,
};

Events.propTypes = {
  messages: React.PropTypes.arrayOf(Line),
  updateTimeAgo: React.PropTypes.func,
};*/

export default Events;
