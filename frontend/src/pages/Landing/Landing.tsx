import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Pricing from '../../components/Pricing/Pricing';
import Testimonials from '../../components/Testimonials/Testimonials';
import Footer from '../../components/Footer/Footer';
import UpcomingEvents from '../../components/UpcomingEvents/UpcomingEvents';
import { ThemeProvider } from '../../context/ThemeContext';
import './Landing.css';

const Landing: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="landing-page">
        <div className="scroll-progress"></div>
        <Navbar />
        <Hero />
        <Features />
        <UpcomingEvents />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Landing;
