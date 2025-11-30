import React from 'react';
import { FaBolt, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-logo">
                        <FaBolt className="logo-icon" />
                        <span className="logo-text">Zoharix Pay + Tickets</span>
                    </div>
                    <p className="footer-tagline">
                        Empowering event organizers and businesses across Africa
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="#" className="social-link" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a href="#" className="social-link" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="#" className="social-link" aria-label="LinkedIn">
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
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Press Kit</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-heading">Support</h4>
                    <ul className="footer-links">
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
