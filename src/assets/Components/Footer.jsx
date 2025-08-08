import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faBluesky } from '@fortawesome/free-brands-svg-icons';
import HomeLogo from '../Icons/HomeIcon';

const Footer = () => {
  return (
    <footer>
      <h1> <HomeLogo />Un Hogar Más</h1>
      <div className="rrss">
        <p>© 2025 Un Hogar Más.</p>
        <FontAwesomeIcon icon={faFacebookF} size="lg" />
        <FontAwesomeIcon icon={faInstagram} size="lg" />
        <FontAwesomeIcon icon={faBluesky} size="lg" />
      </div>

    </footer>
  )
}

export default Footer