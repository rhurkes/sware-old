import React from 'react';

const FooterStats = (props) => {
  const { lat, lon } = props.geolocation;
  const latLon = lat && lon
    ? (<li>
      <span className="teal-color">[</span>
      <span>{lat}, {lon}</span>
      <span className="teal-color">]</span>
    </li>)
    : null;

  return (
    <ol id="footer-stats">
      {latLon}
    </ol>
  );
};

FooterStats.propTypes = {
  geolocation: React.PropTypes.object,
};

export default FooterStats;
