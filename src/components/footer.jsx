import React from 'react';
import Clock from './clock';

const Footer = (props) => {
  const { information } = props;
  const { lat, lon } = props.geolocation;

  return (
    <footer>
      <ol className="footer-left">
        <li>
          <span>{information}</span>
        </li>
      </ol>
      <ol className="footer-right">
        <li>
          <ol id="footer-stats">
            <li>
              <span className="teal-color">[</span>
              <span>{lat}, {lon}</span>
              <span className="teal-color">]</span>
            </li>
          </ol>
        </li>
        <li>
          <Clock />
        </li>
      </ol>
    </footer>
  );
};

export default Footer;
