import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../Button/Button';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active Section Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5, rootMargin: '-70px 0px -70% 0px' }
        );

        const sections = ['features', 'how-it-works', 'pricing', 'testimonials'];
        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
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

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        closeMobileMenu();
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src="/apple-touch-icon.png" alt="Z-Events Logo" className="logo-img" />
                    <span className="logo-text">Z-Events</span>
                </div>

                {/* Desktop Components */}
                <div className="desktop-nav">
                    <ul className="nav-links">
                        <li><a href="#features" className={activeSection === 'features' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'features')}>Features</a></li>
                        <li><a href="#how-it-works" className={activeSection === 'how-it-works' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'how-it-works')}>How it Works</a></li>
                        <li><a href="#pricing" className={activeSection === 'pricing' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'pricing')}>Pricing</a></li>
                        <li><a href="#testimonials" className={activeSection === 'testimonials' ? 'active' : ''} onClick={(e) => scrollToSection(e, 'testimonials')}>Testimonials</a></li>
                    </ul>

                    <div className="nav-actions">
                        <ThemeToggle />
                        <Link to="/signup" className="nav-cta-link" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="primary"
                                className="nav-cta-btn"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-icon"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Mobile Menu Drawer */}
                <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <ul className="mobile-links">
                        <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')}>Features</a></li>
                        <li><a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')}>How it Works</a></li>
                        <li><a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')}>Pricing</a></li>
                        <li><a href="#testimonials" onClick={(e) => scrollToSection(e, 'testimonials')}>Testimonials</a></li>
                    </ul>
                    <div className="mobile-actions">
                        <ThemeToggle />
                        <Link to="/signup" style={{ textDecoration: 'none', width: '100%' }}>
                            <Button
                                variant="primary"
                                className="nav-cta-btn mobile-cta"
                                onClick={closeMobileMenu}
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
