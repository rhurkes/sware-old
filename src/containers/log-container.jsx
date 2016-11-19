import { connect } from 'react-redux';
import Log from '../components/log';
import { getLogLines } from '../ducks/app-duck';

const mapStateToProps = state => ({
  logLines: getLogLines(state),
});

const LogContainer = connect(
  mapStateToProps
)(Log);

export default LogContainer;
