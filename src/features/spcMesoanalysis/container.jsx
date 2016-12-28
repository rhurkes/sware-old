import { connect } from 'react-redux';
import SPCMesoanalysis from './component';
import {
  getTime,
  getParameter,
  getSector,
  getOverlays,
  getUnderlay,
  getRecentParameters,
  updateRefreshInterval,
  updateTime,
  updateParameter,
  updateSector,
  addOverlay,
  removeOverlay,
  updateUnderlay,
} from './duck';

const mapStateToProps = state => ({
  selectedTime: getTime(state),
  parameter: getParameter(state),
  sector: getSector(state),
  overlays: getOverlays(state),
  underlay: getUnderlay(state),
  recentParameters: getRecentParameters(state),
});

const SPCMesoanalysisContainer = connect(
  mapStateToProps,
  { updateRefreshInterval,
    updateTime,
    updateParameter,
    updateSector,
    addOverlay,
    removeOverlay,
    updateUnderlay },
)(SPCMesoanalysis);

export default SPCMesoanalysisContainer;
