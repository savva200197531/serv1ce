import React from 'react';
import './Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF, faVk } from "@fortawesome/free-brands-svg-icons"

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="copyright">Copyright © 2018 Футбольная Школа «Ва-Банк»</p>
          <ul className="socials-list">
            <li className="socials-item">
              <a href="#" className="socials-link"><FontAwesomeIcon icon={faVk} /></a>
            </li>
            <li className="socials-item">
              <a href="#" className="socials-link"><FontAwesomeIcon icon={faFacebookF} /></a>
            </li>
            <li className="socials-item">
              <a href="#" className="socials-link"><FontAwesomeIcon icon={faInstagram} /></a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
