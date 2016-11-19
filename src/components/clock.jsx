import React from 'react';
import { timestamp } from '../helpers/datetime';

const updateTick = 1000;

export default class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      time: timestamp(),
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: timestamp() });
    }, updateTick);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (<div id="clock">{this.state.time}</div>);
  }
}
