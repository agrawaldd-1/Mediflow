import React from "react";

const Footer = () => {
  return (
    <footer className="footer" id="contact">

      <div className="footer-container">

        {/* About */}

        <div className="footer-about">

          <h2>MediFlow</h2>

          <p>
            Delivering compassionate, patient-centered healthcare through
            experienced specialists, advanced technology, and world-class
            medical services.
          </p>

          <div className="social-icons">

            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a href="#">
              <i className="fa-brands fa-twitter"></i>
            </a>

            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#doctors">Doctors</a>
          <a href="#contact">Contact</a>

        </div>

        {/* Departments */}

        <div className="footer-services">

          <h3>Departments</h3>

          <a href="#">Cardiology</a>
          <a href="#">Neurology</a>
          <a href="#">Orthopedics</a>
          <a href="#">Diagnostics</a>
          <a href="#">Emergency Care</a>

        </div>

        {/* Contact */}

        <div className="footer-contact">

          <h3>Contact Us</h3>

          <p>📍 Nagpur, Maharashtra</p>

          <a href="tel:+919665761444">
            📞 +91 96657 61444
          </a>

          <a href="mailto:support@mediflow.com">
            ✉️ support@mediflow.com
          </a>

          <p>🚑 Emergency Available 24×7</p>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} MediFlow Hospital. All Rights Reserved.
        </p>

        <div>

          <a href="#">Privacy Policy</a>

          <a href="#">Terms & Conditions</a>

          <a href="#">Sitemap</a>

        </div>

      </div>

    </footer>
  );
};

export default Footer;