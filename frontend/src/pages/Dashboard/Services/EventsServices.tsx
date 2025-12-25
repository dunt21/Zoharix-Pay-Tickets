import React, { useState } from 'react';
import {
    Calendar,
    Search,
    MapPin,
    MoreVertical,
    Edit2,
    Trash2,
    Clock,
    Tag,
    Image as ImageIcon,
    CheckCircle,
    Star,
    ArrowRight,
    Briefcase
} from 'lucide-react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import './EventsServices.css';

// --- Types ---
type Tab = 'explore' | 'history' | 'manage';
type Category = 'all' | 'events' | 'services';

// --- Mock Data ---

const EXPLORE_ITEMS = [
    {
        id: 101,
        type: 'event',
        title: 'Neon Nights Festival',
        date: 'Dec 24, 2025',
        location: 'Grand Arena',
        price: '₵150',
        imageBg: 'linear-gradient(45deg, #FF0099, #493240)',
        category: 'Party',
        spots: 'Limited'
    },
    {
        id: 102,
        type: 'service',
        title: 'Premium Catering',
        duration: 'Custom',
        price: 'From ₵500',
        imageBg: 'linear-gradient(135deg, #FFD700, #B8860B)',
        category: 'Dining',
        rating: 4.9
    },
    {
        id: 103,
        type: 'event',
        title: 'Tech Future Summit',
        date: 'Jan 15, 2026',
        location: 'Kempinski Hotel',
        price: '₵300',
        imageBg: 'linear-gradient(45deg, #00F260, #0575E6)',
        category: 'Tech',
        spots: 'Open'
    },
    {
        id: 104,
        type: 'service',
        title: 'Event Photography',
        duration: 'Hourly',
        price: '₵250/hr',
        imageBg: 'linear-gradient(135deg, #6AB04C, #BADC58)',
        category: 'Media',
        rating: 4.8
    }
];

const HISTORY_ITEMS = [
    {
        id: 201,
        type: 'event',
        title: 'Afrochella 2024',
        date: 'Dec 28, 2024',
        location: 'El Wak Stadium',
        status: 'Completed',
        myRating: 5
    },
    {
        id: 202,
        type: 'service',
        title: 'Full Body Massage',
        date: 'Nov 10, 2024',
        provider: 'Zen Spa',
        status: 'Completed',
        myRating: 4
    },
    {
        id: 203,
        type: 'event',
        title: 'Jazz & Wine Night',
        date: 'Oct 05, 2024',
        location: '+233 Jazz Bar',
        status: 'Attended',
        myRating: 5
    }
];

const MANAGED_ITEMS = [
    { id: 301, type: 'event', title: 'Neon Nights Festival', date: 'Dec 24, 2025', location: 'Grand Arena', price: '₵150', status: 'Active', sold: 450, total: 1000 },
    { id: 302, type: 'service', title: 'Haircut & Beard Trim', duration: '45 mins', price: '₵80', category: 'Grooming', status: 'Active', sold: 12, total: null },
    { id: 303, type: 'event', title: 'Tech Start Summit', date: 'Jan 15, 2026', location: 'Kempinski', price: 'Free', status: 'Draft', sold: 0, total: 200 },
];

const EventsServices: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('explore');
    const [filterCategory, setFilterCategory] = useState<Category>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const renderExplore = () => (
        <div className="es-grid animate-fade-in">
            {EXPLORE_ITEMS.filter(i =>
                (filterCategory === 'all' || (filterCategory === 'events' && i.type === 'event') || (filterCategory === 'services' && i.type === 'service')) &&
                i.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(item => (
                <div key={item.id} className="es-card explore-card">
                    <div className="es-card-image" style={{ background: item.imageBg }}>
                        <span className="category-badge">{item.category}</span>
                        {item.type === 'service' && <span className="service-icon"><Star size={14} fill="currentColor" /> {item.rating}</span>}
                    </div>
                    <div className="es-card-content">
                        <div className="es-card-header">
                            <h3>{item.title}</h3>
                            <button className="icon-btn-ghost"><MoreVertical size={16} /></button>
                        </div>
                        <div className="es-meta">
                            {item.type === 'event' ? (
                                <>
                                    <span><Calendar size={14} /> {item.date}</span>
                                    <span><MapPin size={14} /> {item.location}</span>
                                </>
                            ) : (
                                <>
                                    <span><Clock size={14} /> {item.duration}</span>
                                    <span><Tag size={14} /> {item.price}</span>
                                </>
                            )}
                        </div>
                        <div className="es-actions">
                            <div className="price-tag">{item.price}</div>
                            <Button variant="primary" className="book-btn-sm">
                                {item.type === 'event' ? 'Book Ticket' : 'Book Now'}
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderHistory = () => (
        <div className="es-list animate-fade-in">
            {HISTORY_ITEMS.map(item => (
                <div key={item.id} className="history-item">
                    <div className="history-icon">
                        <CheckCircle size={24} color="#4ade80" />
                    </div>
                    <div className="history-details">
                        <h3>{item.title}</h3>
                        <p>{item.type === 'event' ? item.date : `${item.date} • ${item.provider}`}</p>
                    </div>
                    <div className="history-meta">
                        <span className="status-pill completed">{item.status}</span>
                        <div className="rating-stars">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < item.myRating ? "#fbbf24" : "transparent"} color={i < item.myRating ? "#fbbf24" : "#52525b"} />
                            ))}
                        </div>
                    </div>
                    <div className="history-actions">
                        <Button variant="outline">Receipt</Button>
                        <Button variant="secondary">Book Again</Button>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderManage = () => (
        <div className="es-grid animate-fade-in">
            {/* Create Actions */}
            <div className="es-card dashed-card" onClick={() => { }}>
                <div className="dashed-content">
                    <div className="plus-circle event-theme">
                        <Calendar size={32} />
                    </div>
                    <h3>Create Event</h3>
                    <p>Host a party, workshop, or show</p>
                    <div className="action-tag">Get Started <ArrowRight size={14} /></div>
                </div>
            </div>

            <div className="es-card dashed-card" onClick={() => { }}>
                <div className="dashed-content">
                    <div className="plus-circle service-theme">
                        <Briefcase size={32} />
                    </div>
                    <h3>Create Service</h3>
                    <p>Offer catering, photography, etc.</p>
                    <div className="action-tag">Get Started <ArrowRight size={14} /></div>
                </div>
            </div>
            {MANAGED_ITEMS.map(item => (
                <div key={item.id} className="es-card">
                    <div className="es-card-image">
                        <div className="placeholder-img">
                            <ImageIcon size={32} color="rgba(255,255,255,0.2)" />
                        </div>
                        <span className={`status-tag ${item.status.toLowerCase()}`}>{item.status}</span>
                    </div>
                    <div className="es-card-content">
                        <div className="es-card-header">
                            <h3>{item.title}</h3>
                            <button className="icon-btn-ghost"><MoreVertical size={16} /></button>
                        </div>
                        <div className="es-meta">
                            {item.type === 'event' ? (
                                <>
                                    <span><Calendar size={14} /> {item.date}</span>
                                    <span><MapPin size={14} /> {item.location}</span>
                                </>
                            ) : (
                                <>
                                    <span><Clock size={14} /> {item.duration}</span>
                                    <span><Tag size={14} /> {item.category}</span>
                                </>
                            )}
                        </div>
                        {item.type === 'event' && item.total && (
                            <div className="es-stats">
                                <div className="stat-label">Tickets Sold</div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${(item.sold! / item.total) * 100}%` }}></div>
                                </div>
                                <div className="stat-nums">
                                    <span>{item.sold}</span>
                                    <span style={{ color: 'var(--text-secondary)' }}>/ {item.total}</span>
                                </div>
                            </div>
                        )}
                        <div className="es-actions">
                            <div className="price-tag">{item.price}</div>
                            <div className="action-buttons">
                                <button className="icon-btn-edit"><Edit2 size={16} /></button>
                                <button className="icon-btn-del"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="es-container">
            {/* Header */}
            <header className="es-header">
                <div className="es-header-content">
                    <h1 className="es-title">Events & Services</h1>
                    <p className="es-subtitle">Explore upcoming experiences or manage your bookings.</p>
                </div>
                <div className="es-header-actions">
                    <div className="tab-pill-group">
                        <button
                            className={`tab-pill ${activeTab === 'explore' ? 'active' : ''}`}
                            onClick={() => setActiveTab('explore')}
                        >
                            Explore
                        </button>
                        <button
                            className={`tab-pill ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            My History
                        </button>
                        <button
                            className={`tab-pill ${activeTab === 'manage' ? 'active' : ''}`}
                            onClick={() => setActiveTab('manage')}
                        >
                            Manage
                        </button>
                    </div>
                </div>
            </header>

            {/* Filter Bar */}
            <div className="es-toolbar">
                <div className="search-wrapper">
                    <Input
                        placeholder="Search events, services..."
                        icon={<Search size={16} />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {activeTab === 'explore' && (
                    <div className="filter-group">
                        <button
                            className={`filter-chip ${filterCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterCategory('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-chip ${filterCategory === 'events' ? 'active' : ''}`}
                            onClick={() => setFilterCategory('events')}
                        >
                            Events Only
                        </button>
                        <button
                            className={`filter-chip ${filterCategory === 'services' ? 'active' : ''}`}
                            onClick={() => setFilterCategory('services')}
                        >
                            Services Only
                        </button>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="es-content">
                {activeTab === 'explore' && renderExplore()}
                {activeTab === 'history' && renderHistory()}
                {activeTab === 'manage' && renderManage()}
            </div>
        </div>
    );
};

export default EventsServices;
