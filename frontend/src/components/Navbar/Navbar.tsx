import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoWalletOutline } from 'react-icons/io5';
import Button from '../Button/Button';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <IoWalletOutline className="logo-icon" />
                    <span className="logo-text">Zoharix Pay</span>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-icon"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Navigation Links */}
                <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <li><a href="#features" onClick={closeMobileMenu}>Features</a></li>
                    <li><a href="#how-it-works" onClick={closeMobileMenu}>How it Works</a></li>
                    <li><a href="#pricing" onClick={closeMobileMenu}>Pricing</a></li>
                    <li><a href="#testimonials" onClick={closeMobileMenu}>Testimonials</a></li>
                    <li><ThemeToggle /></li>
                    <li>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="primary"
                                className="nav-cta-btn"
                                onClick={closeMobileMenu}
                            >
                                Get Started
                            </Button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
