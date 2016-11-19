import { connect } from 'react-redux';
import App from '../components/app';
import { getPollingToggles, getPages, togglePolling } from '../ducks/app-duck';

/* If specified, the component will subscribe to Redux store updates. Any time it updates,
  mapStateToProps will be called. Its result must be a plain object*, and it will be merged
  into the component’s props. If you omit it, the component will not be subscribed to the
  Redux store. If ownProps is specified as a second argument, its value will be the props
  passed to your component, and mapStateToProps will be additionally re-invoked whenever
  the component receives new props (e.g. if props received from a parent component have
  shallowly changed, and you use the ownProps argument, mapStateToProps is re-evaluated). */
const mapStateToProps = state => ({
  pollingToggles: getPollingToggles(state),
  pages: getPages(state),
});

/* Connects a React component to a Redux store. It does not modify the component class
  passed to it. Instead, it returns a new, connected component class, for you to use.

  The second argument to connect() is mapDispatchToProps. If an object is passed, each
  function inside it will be assumed to be a Redux action creator. An object with the
  same function names, but with every action creator wrapped into a dispatch call so
  they may be invoked directly, will be merged into the component’s props. If a function
  is passed, it will be given dispatch. It’s up to you to return an object that somehow
  uses dispatch to bind action creators in your own way. (Tip: you may use the
  bindActionCreators() helper from Redux.) If you omit it, the default implementation
  just injects dispatch into your component’s props. If ownProps is specified as a second
  argument, its value will be the props passed to your component, and mapDispatchToProps
  will be re-invoked whenever the component receives new props. */
const AppContainer = connect(
  mapStateToProps,
  { togglePolling }
)(App);

export default AppContainer;
