import React from 'react';
import { FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-logo">
                        <img src="/apple-touch-icon.png" alt="Z-Events Logo" className="footer-logo-img" />
                        <span className="logo-text">Z-Events</span>
                    </div>
                    <p className="footer-tagline">
                        Empowering event organizers and businesses across Africa
                    </p>
                    <div className="social-links">
                        <a href="https://x.com/zoharix_tech" className="social-link" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://www.youtube.com/@TechTutor_Tv" className="social-link" aria-label="YouTube">
                            <FaYoutube />
                        </a>
                        <a href="https://www.instagram.com/zoharix?igsh=Z3gzMjR1aGFwbHBv&utm_source=ig_contact_invite" className="social-link" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://www.linkedin.com/company/zoharix/" className="social-link" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Product</h4>
                    <ul className="footer-links">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#">API Docs</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Company</h4>
                    <ul className="footer-links">
                        <li><a href="https://www.zoharix.tech/">About Us</a></li>
                        <li><a href="https://www.zoharix.tech/">Careers</a></li>
                        <li><a href="https://www.zoharix.tech/">Blog</a></li>
                        <li><a href="https://www.zoharix.tech/">Press Kit</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Support</h4>
                    <ul className="footer-links">
                        <li><a href="https://www.zoharix.tech/home.html#contact">Help Center</a></li>
                        <li><a href="https://www.zoharix.tech/home.html#contact">Contact Us</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
