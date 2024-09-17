import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Blog Site. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;