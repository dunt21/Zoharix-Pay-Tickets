import React from 'react';
import { FaCalendarAlt, FaTicketAlt, FaCreditCard, FaMobileAlt, FaBriefcase, FaRobot } from 'react-icons/fa';
import SectionHeader from '../SectionHeader/SectionHeader';
import FeatureCard from '../FeatureCard/FeatureCard';
import './Features.css';

const Features: React.FC = () => {
    const features = [
        {
            id: 'tickets',
            icon: <FaTicketAlt />,
            title: 'Smart Ticket Sales',
            description: 'Sell tickets with QR codes, manage capacity, and track sales in real-time.',
            features: ['Digital QR tickets', 'Instant delivery', 'Fraud prevention'],
            featured: true,
            badge: 'Most Popular',
            image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=800&q=80',
            className: 'feature-large' // Spans 2 cols, 2 rows
        },
        {
            id: 'events',
            icon: <FaCalendarAlt />,
            title: 'Event Creation',
            description: 'Create stunning events in minutes with our intuitive builder.',
            features: ['Custom pages', 'Real-time updates'],
            image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80',
            className: 'feature-tall' // Spans 1 col, 2 rows
        },
        {
            id: 'payment',
            icon: <FaCreditCard />,
            title: 'Multi-Payment',
            description: 'Accept MoMo, Cards, and USSD instantly.',
            features: ['Instant payouts', 'Secure'],
            // Updated Image URL - High reliability
            image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=800&q=80',
            className: 'feature-wide' // Spans 2 cols
        },
        {
            id: 'qr',
            icon: <FaMobileAlt />,
            title: 'Digital Check-in',
            description: 'Seamless offline scanning.',
            features: ['Fast', 'Secure'],
            image: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&w=800&q=80',
            className: 'feature-standard'
        },
        {
            id: 'business',
            icon: <FaBriefcase />,
            title: 'Booking Pages',
            description: 'For salons & consultants.',
            features: ['Calendar sync', 'Reminders'],
            image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
            className: 'feature-standard'
        },
        {
            id: 'ai',
            icon: <FaRobot />,
            title: 'AI Posters',
            description: 'Generate designs in seconds.',
            features: ['Custom branding', 'AI-powered'],
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
            className: 'feature-wide'
        },
    ];

    return (
        <section id="features" className="features">
            <SectionHeader
                title="Everything You Need"
                subtitle="Powerful tools for every creator."
            />

            <div className="features-grid">
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </section>
    );
};

export default Features;
