import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaDownload, FaConciergeBell, FaBullhorn, FaShieldAlt, FaCamera } from 'react-icons/fa';
import SectionHeader from '../SectionHeader/SectionHeader';
import Button from '../Button/Button';
import './UpcomingEvents.css';

const UpcomingEvents: React.FC = () => {
    const items = [
        {
            id: 1,
            type: 'event',
            title: "Neon Rave 2025",
            date: "Dec 31, 2025",
            location: "Cyber Arena, NY",
            price: "$50",
            imageClass: "event-bg-1",
            category: "Party"
        },
        {
            id: 's1',
            type: 'service',
            title: "Premium Catering",
            description: "Gourmet food & drinks for your VIP guests.",
            price: "Custom",
            imageClass: "service-bg-1",
            category: "Service",
            icon: <FaConciergeBell />
        },
        {
            id: 2,
            type: 'event',
            title: "Future Tech Summit",
            date: "Jan 15, 2026",
            location: "Silicon Valley, CA",
            price: "$299",
            imageClass: "event-bg-2",
            category: "Conference"
        },
        {
            id: 's2',
            type: 'service',
            title: "Event Marketing",
            description: "Boost ticket sales with our expert team.",
            price: "From $500",
            imageClass: "service-bg-2",
            category: "Marketing",
            icon: <FaBullhorn />
        },
        {
            id: 3,
            type: 'event',
            title: "Midnight Jazz",
            date: "Feb 14, 2026",
            location: "Blue Note, Chicago",
            price: "$75",
            imageClass: "event-bg-3",
            category: "Music"
        },
        {
            id: 's3',
            type: 'service',
            title: "Security Pro",
            description: "Top-tier security for safe events.",
            price: "From $200",
            imageClass: "service-bg-3",
            category: "Security",
            icon: <FaShieldAlt />
        },
        {
            id: 4,
            type: 'event',
            title: "Art & Soul Festival",
            date: "Mar 20, 2026",
            location: "Downtown Arts District",
            price: "$45",
            imageClass: "event-bg-4",
            category: "Festival"
        },
        {
            id: 's4',
            type: 'service',
            title: "Pro Photography",
            description: "Capture every moment in high definition.",
            price: "From $300",
            imageClass: "service-bg-4",
            category: "Media",
            icon: <FaCamera />
        },
        {
            id: 5,
            type: 'event',
            title: "Crypto World Expo",
            date: "Apr 10, 2026",
            location: "Convention Center, Dubai",
            price: "$150",
            imageClass: "event-bg-5",
            category: "Expo"
        },
        {
            id: 6,
            type: 'event',
            title: "Summer Vibes Concert",
            date: "Jun 05, 2026",
            location: "Beachside Stage, Miami",
            price: "$120",
            imageClass: "event-bg-6",
            category: "Concert"
        }
    ];

    // Duplicate items for seamless infinite scroll
    const allItems = [...items, ...items];

    return (
        <section className="upcoming-events">
            <SectionHeader
                title="Events & Services"
                subtitle="Discover trending events and premium services for your needs."
            />

            <div className="marquee-container">
                <div className="marquee-track">
                    {allItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="marquee-item">
                            <div className="event-card">
                                <div className={`event-image ${item.imageClass}`}>
                                    <div className={`event-category ${item.type === 'service' ? 'service-badge' : ''}`}>
                                        {item.category}
                                    </div>
                                    <div className="event-overlay">
                                        <Button variant="primary" icon={item.type === 'event' ? <FaTicketAlt /> : <FaConciergeBell />} className="book-btn">
                                            {item.type === 'event' ? 'Book Now' : 'Hire Now'}
                                        </Button>
                                    </div>
                                </div>
                                <div className="event-details">
                                    <h3 className="event-title">{item.title}</h3>

                                    {item.type === 'event' ? (
                                        <div className="event-info">
                                            <span><FaCalendarAlt /> {item.date}</span>
                                            <span><FaMapMarkerAlt /> {item.location}</span>
                                        </div>
                                    ) : (
                                        <div className="event-info">
                                            <span className="service-desc">{item.description}</span>
                                        </div>
                                    )}

                                    <div className="event-footer">
                                        <span className="event-price">{item.price}</span>
                                        <button className="download-btn" aria-label={item.type === 'event' ? "Download Ticket" : "View Details"}>
                                            {item.type === 'event' ? <FaDownload /> : item.icon}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="events-cta">
                <Button variant="secondary">View All</Button>
            </div>
        </section>
    );
};

export default UpcomingEvents;
