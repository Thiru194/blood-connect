import React, { useState } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Decorative background */}
      <div className="footer-decoration decoration-top"></div>
      <div className="footer-decoration decoration-bottom"></div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <Container>
          <Row className="g-4 g-lg-5 pb-5 pb-lg-5">
            {/* About Section */}
            <Col lg={3} md={6} sm={12} className="footer-section">
              <div className="section-header">
                <h5 className="footer-title">About BloodConnect</h5>
                <div className="section-line"></div>
              </div>
              <p className="footer-description">
                Connecting life-savers with life-savers. BloodConnect is dedicated to building
                a trusted community of blood donors and recipients.
              </p>
              <div className="footer-stats">
                <div className="stat">
                  <div className="stat-value">10K+</div>
                  <div className="stat-label">Lives Saved</div>
                </div>
                <div className="stat">
                  <div className="stat-value">25K+</div>
                  <div className="stat-label">Donors</div>
                </div>
              </div>
            </Col>

            {/* Quick Links Section */}
            <Col lg={3} md={6} sm={12} className="footer-section">
              <div className="section-header">
                <h5 className="footer-title">Quick Links</h5>
                <div className="section-line"></div>
              </div>
              <ul className="footer-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/requests">Blood Requests</Link>
                </li>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </Col>

            {/* Contact Section */}
            <Col lg={3} md={6} sm={12} className="footer-section">
              <div className="section-header">
                <h5 className="footer-title">Contact Info</h5>
                <div className="section-line"></div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <p className="contact-label">Email</p>
                  <a href="mailto:info@bloodconnect.com">info@bloodconnect.com</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <p className="contact-label">Phone</p>
                  <a href="tel:+1800BLOOD911">1-800-BLOOD-911</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <p className="contact-label">Address</p>
                  <span>India Blood Bank Network</span>
                </div>
              </div>
            </Col>

            {/* Newsletter Section */}
            <Col lg={3} md={6} sm={12} className="footer-section">
              <div className="section-header">
                <h5 className="footer-title">Newsletter</h5>
                <div className="section-line"></div>
              </div>
              <p className="footer-description">
                Stay updated with blood donation campaigns and life-saving stories.
              </p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <InputGroup className="newsletter-input">
                  <Form.Control
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                  <Button className="subscribe-btn" type="submit">
                    <span>→</span>
                  </Button>
                </InputGroup>
                {subscribed && <p className="success-message">✓ Thank you for subscribing!</p>}
              </form>
              <p className="privacy-notice">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Social Links */}
      <div className="footer-social">
        <Container>
          <div className="social-divider"></div>
          <div className="social-content">
            <div className="social-links">
              <a href="https://facebook.com" className="social-icon" title="Facebook" target="_blank" rel="noopener noreferrer">
                f
              </a>
              <a href="https://twitter.com" className="social-icon" title="Twitter" target="_blank" rel="noopener noreferrer">
                𝕏
              </a>
              <a href="https://instagram.com" className="social-icon" title="Instagram" target="_blank" rel="noopener noreferrer">
                📷
              </a>
              <a href="https://linkedin.com" className="social-icon" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                in
              </a>
            </div>

            {/* Legal Links */}
            <div className="legal-links">
              <Link to="#">Privacy Policy</Link>
              <span className="divider">•</span>
              <Link to="#">Terms of Service</Link>
              <span className="divider">•</span>
              <Link to="#">Cookie Policy</Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <Container>
          <div className="copyright-section">
            <p>
              &copy; {currentYear} BloodConnect. All rights reserved. Building a community of life-savers.
            </p>
            <p className="tagline">Donate Blood. Change Lives. Save Communities.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;