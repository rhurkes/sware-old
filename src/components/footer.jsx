import React from 'react';
import Clock from './clock';
import FooterStatsContainer from '../containers/footer-stats-container';

const Footer = () =>
  (
    <footer>
      <ol className="footer-left">
        <li>
        </li>
      </ol>
      <ol className="footer-right">
        <li>
          <FooterStatsContainer />
        </li>
        <li>
          <Clock />
        </li>
      </ol>
    </footer>
  );

export default Footer;
