/*eslint-disable */

import React from 'react';

import logo from './images/logo.png';
// import instagramimage1 from './'
// import instagramimage1 from '../images/instagram-image/1.png'
import instagramimage1 from './images/instagram-image/1.png';
import instagramimage2 from './images/instagram-image/2.png';
import instagramimage3 from './images/instagram-image/3.png';
import instagramimage4 from './images/instagram-image/4.png';
import instagramimage5 from './images/instagram-image/5.png';
import instagramimage6 from './images/instagram-image/6.png';
import instagramimage7 from './images/instagram-image/7.png';
import instagramimage8 from './images/instagram-image/8.png';

function Footer() {
  return (
    <>
      <footer>
        {/* <!-- footer top start --> */}
        <div className="footer-top">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12 footer-about mb-lg-0 mb-5">
              <div className="footer-logo">
                <img src={logo} alt="image" />
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
              </p>

              <ul className="footer-payment">
                <li>
                  <a href="/">
                    <i className="fab fa-cc-visa"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fab fa-cc-paypal"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fab fa-cc-mastercard"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fab fa-cc-jcb"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i className="fab fa-cc-discover"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 col-12 footer-link-one mb-lg-0 mb-5">
              <h2 className="footer-title">Useful Links</h2>
              <ul>
                <li>
                  <a href="/Home">Home</a>
                </li>
                <li>
                  <a href="/About">About Us</a>
                </li>
                <li>
                  <a href="/Contact">Contact Us</a>
                </li>
                <li>
                  <a href="/Blog">Blog</a>
                </li>
                <li>
                  <a href="/Faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 col-12 footer-address mb-lg-0 mb-5">
              <h2 className="footer-title">Address</h2>
              <ul>
                <li>
                  <span className="address-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <span>
                    7000, WhiteField, Manchester Highway, London. 401203
                  </span>
                </li>
                <li>
                  <span className="address-icon">
                    <i className="fas fa-mobile"></i>
                  </span>
                  <a href="/">+91 1234567890</a>
                </li>
                <li>
                  <span className="address-icon">
                    <i className="fas fa-envelope-open"></i>
                  </span>
                  <a href="/">youremail@domain.com</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-5 col-md-6 col-12 footer-instagram mb-lg-0 mb-5">
              <h2 className="footer-title">Instagram</h2>
              <ul>
                <li>
                  <a href="/">
                    <img src={instagramimage1} alt="instagramimage1" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img src={instagramimage2} alt="instagramimage2" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img src={instagramimage3} alt="instagramimage3" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img src={instagramimage4} alt="instagramimage4" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img src={instagramimage5} alt="instagramimage5" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img src={instagramimage6} alt="instagramimage6" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img src={instagramimage7} alt="instagramimage7" />
                  </a>
                </li>
                <li>
                  <a href="/">
                    <img src={instagramimage8} alt="instagramimage8" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- footer top end --> */}

        {/* <!-- footer bottom start --> */}

        <div className="footer-bottom">
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <ul className="social-media">
                <li>
                  <a href="/" className="facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="insta">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="youtube">
                    <i className="fab fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a href="/" className="linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="copyright">
              <p>Copyright © 2020 Themextra. All rights reserved</p>
            </div>
          </div>
        </div>

        {/* <!-- footer bottom end --> */}
      </footer>
    </>
  );
}

export default Footer;
