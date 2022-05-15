import React from 'react'
import './footer.scss'
import { faVk, faFacebook, faOdnoklassniki } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const links = [
  {
    icon: faVk,
    url: 'https://vk.com/gk_gazoil',
  },
  {
    icon: faFacebook,
    url: 'https://www.facebook.com/gazoil22',
  },
  {
    icon: faOdnoklassniki,
    url: 'https://ok.ru/gazoil',
  },
]

// подвал сайта
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="copyright">© ООО «Техногазсервис», 2019</p>

          <div className="footer-socials">
            {links.map((link, index) => (
              <a className="footer-social" key={index} href={link.url} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={link.icon as any} size="lg"/>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
