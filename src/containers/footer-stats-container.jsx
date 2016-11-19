import { connect } from 'react-redux';
import FooterStats from '../components/footer-stats';
import { getGeolocation } from '../ducks/app-duck';
import mathHelper from '../helpers/math';

const latLonPlaces = 3;

const mapStateToProps = (state) => {
  const rawGeolocation = getGeolocation(state);
  if (!rawGeolocation) { return {}; }
  const { latitude, longitude } = rawGeolocation;
  const geolocation = {
    lat: mathHelper.round(latitude, latLonPlaces),
    lon: mathHelper.round(Math.abs(longitude), latLonPlaces),
  };

  return { geolocation };
};

const FooterContainer = connect(
  mapStateToProps
)(FooterStats);

export default FooterContainer;
