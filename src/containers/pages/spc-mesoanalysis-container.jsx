import { connect } from 'react-redux';
import SPCMesoanalysis from '../../components/pages/spc-mesoanalysis';
import {
  getTime,
  getParameter,
  getSector,
  getOverlays,
  getUnderlay,
  updateRefreshInterval,
  updateTime,
  updateParameter,
  updateSector,
  addOverlay,
  removeOverlay,
  updateUnderlay,
} from '../../ducks/spc-mesoanalysis-duck';

const mapStateToProps = state => ({
  selectedTime: getTime(state),
  parameter: getParameter(state),
  sector: getSector(state),
  overlays: getOverlays(state),
  underlay: getUnderlay(state),
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
