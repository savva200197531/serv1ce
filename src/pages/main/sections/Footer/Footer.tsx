import React from 'react'
import './Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faSquarePhone } from '@fortawesome/free-solid-svg-icons'
import sk from '../../../../assets/images/sk.png'

// подвал сайта
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info-wrapper">
            <p className="copyright">ООО “РУСЬТЕЛЕТЕХ”, 2009-2021</p>
            <div className="footer-info">
              <FontAwesomeIcon icon={faHouse as any} size="lg" />
              <div>
                <p>Орджоникидзе, д.11, строение 40,</p>
                <p>Москва, 115419</p>
              </div>
            </div>
            <div className="footer-info">
              <FontAwesomeIcon icon={faSquarePhone as any} size="lg" />
              <div>
                <p>Телефон: +7 (495) 234-9777</p>
                <p>факс: +7 (495) 234-9777</p>
              </div>
            </div>
          </div>
          <img src={sk} alt="skolkovo"/>
        </div>
      </div>
    </footer>
  )
}

export default Footer
