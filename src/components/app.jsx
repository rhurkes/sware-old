import React from 'react';
import Nav from './nav';
import Footer from './footer';
import { movePrevPage, moveNextPage } from '../helpers/route';
import audio from '../helpers/audio';
import config from '../config';

// Data fetching containers that need to run in background
import IEMContainer from '../containers/iem-container';

// Utility containers that need to run in background
import GeolocationContainer from '../containers/geolocation-container';

export default class App extends React.Component {
  constructor() {
    super();
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    setTimeout(() => {
      audio.speak(config.INTRO_SPEECH);
    }, 1000);
  }

  handleKeydown(e) {
    console.log(e);
    const { pathname } = this.props.location;
    switch (e.which) {
      case 219:
        e.preventDefault();
        movePrevPage(pathname);
        break;
      case 221: {
        e.preventDefault();
        moveNextPage(pathname);
        break;
      }
      case 192: {
        // e.preventDefault();
        // toggleLogPage();
        break;
      }
      default:
        break;
    }
  }

  render() {
    const { children, location, pollingToggles, togglePolling } = this.props;

    // Data fetching containers
    const iemContainer = pollingToggles.iem.active ? <IEMContainer /> : null;

    // Utility containers
    const geolocationContainer = <GeolocationContainer />;  // TODO add config

    // Pass props to children - children driven by routing
    const proppedChildren = React.Children.map(children, child =>
      React.cloneElement(child, {
        pollingToggles, togglePolling,
      })
    );

    return (
      <div>
        <Nav location={location} />
        {proppedChildren}
        {iemContainer}
        {geolocationContainer}
        <Footer />
      </div>
    );
  }
}

// React Prop Types
App.propTypes = {
  pollingToggles: React.PropTypes.object,
  togglePolling: React.PropTypes.func,
  children: React.PropTypes.node,
  location: React.PropTypes.object,
};
