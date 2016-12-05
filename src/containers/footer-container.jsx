import { connect } from 'react-redux';
import Footer from '../components/footer';
import { getGeolocation, getStatusbarInfo } from '../ducks/app-duck';
import mathHelper from '../helpers/math';

const latLonDecimalPlaces = 3;

const mapStateToProps = (state) => {
  const rawGeolocation = getGeolocation(state);
  if (!rawGeolocation) { return {}; }
  const { latitude, longitude } = rawGeolocation;
  const geolocation = {
    lat: mathHelper.round(latitude, latLonDecimalPlaces),
    lon: mathHelper.round(Math.abs(longitude), latLonDecimalPlaces),
  };

  return {
    geolocation,
    information: getStatusbarInfo(state),
  };
};

const FooterContainer = connect(
  mapStateToProps
)(Footer);

export default FooterContainer;
