import React, { useState } from 'react';
import {
    Calendar,
    Plus,
    Search,
    MapPin,
    MoreVertical,
    Edit2,
    Trash2,
    Clock,
    Tag,
    Image as ImageIcon
} from 'lucide-react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import './EventsServices.css';

// --- Types ---
type Tab = 'events' | 'services';

const MOCK_EVENTS = [
    { id: 1, title: 'Neon Nights Festival', date: 'Dec 24, 2025', location: 'Grand Arena', price: '₵150', status: 'Active', sold: 450, total: 1000 },
    { id: 2, title: 'Tech Start Summit', date: 'Jan 15, 2026', location: 'Kempinski', price: 'Free', status: 'Draft', sold: 0, total: 200 },
];

const MOCK_SERVICES = [
    { id: 1, title: 'Full Body Massage', duration: '60 mins', price: '₵200', category: 'Wellness', status: 'Active' },
    { id: 2, title: 'Haircut & Beard Trim', duration: '45 mins', price: '₵80', category: 'Grooming', status: 'Active' },
];

const EventsServices: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('events');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="es-container">
            {/* Header */}
            <header className="es-header">
                <div>
                    <h1 className="es-title">Events & Services</h1>
                    <p className="es-subtitle">Create and manage your listings.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className="tab-pill-group">
                        <button
                            className={`tab-pill ${activeTab === 'events' ? 'active' : ''}`}
                            onClick={() => setActiveTab('events')}
                        >
                            Events
                        </button>
                        <button
                            className={`tab-pill ${activeTab === 'services' ? 'active' : ''}`}
                            onClick={() => setActiveTab('services')}
                        >
                            Services
                        </button>
                    </div>
                    <Button variant="primary" icon={<Plus size={18} />}>
                        Create New
                    </Button>
                </div>
            </header>

            {/* Search & Filter Bar */}
            <div className="es-toolbar">
                <div style={{ flex: 1, maxWidth: '400px' }}>
                    <Input
                        placeholder={`Search your ${activeTab}...`}
                        icon={<Search size={16} />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline" style={{ display: 'flex', gap: '0.5rem' }}>
                    <Tag size={16} /> Filter
                </Button>
            </div>

            {/* Grid Content */}
            <div className="es-grid">
                {activeTab === 'events' ? (
                    // Events List
                    MOCK_EVENTS.map(event => (
                        <div key={event.id} className="es-card">
                            <div className="es-card-image">
                                <div className="placeholder-img">
                                    <ImageIcon size={32} color="rgba(255,255,255,0.2)" />
                                </div>
                                <span className={`status-tag ${event.status.toLowerCase()}`}>{event.status}</span>
                            </div>
                            <div className="es-card-content">
                                <div className="es-card-header">
                                    <h3>{event.title}</h3>
                                    <button className="icon-btn-ghost"><MoreVertical size={16} /></button>
                                </div>
                                <div className="es-meta">
                                    <span><Calendar size={14} /> {event.date}</span>
                                    <span><MapPin size={14} /> {event.location}</span>
                                </div>
                                <div className="es-stats">
                                    <div className="stat-label">Tickets Sold</div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${(event.sold / event.total) * 100}%` }}></div>
                                    </div>
                                    <div className="stat-nums">
                                        <span>{event.sold}</span>
                                        <span style={{ color: 'var(--text-secondary)' }}>/ {event.total}</span>
                                    </div>
                                </div>
                                <div className="es-actions">
                                    <div className="price-tag">{event.price}</div>
                                    <div className="action-buttons">
                                        <button className="icon-btn-edit"><Edit2 size={16} /></button>
                                        <button className="icon-btn-del"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Services List
                    MOCK_SERVICES.map(service => (
                        <div key={service.id} className="es-card">
                            <div className="es-card-image service-type">
                                <div className="service-icon-lg">
                                    <Tag size={32} />
                                </div>
                                <span className={`status-tag ${service.status.toLowerCase()}`}>{service.status}</span>
                            </div>
                            <div className="es-card-content">
                                <div className="es-card-header">
                                    <h3>{service.title}</h3>
                                    <button className="icon-btn-ghost"><MoreVertical size={16} /></button>
                                </div>
                                <div className="es-meta">
                                    <span><Clock size={14} /> {service.duration}</span>
                                    <span><Tag size={14} /> {service.category}</span>
                                </div>
                                <div className="es-desc">
                                    Standard service description goes here.
                                </div>
                                <div className="es-actions" style={{ marginTop: 'auto' }}>
                                    <div className="price-tag">{service.price}</div>
                                    <div className="action-buttons">
                                        <button className="icon-btn-edit"><Edit2 size={16} /></button>
                                        <button className="icon-btn-del"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {/* Add New Placeholders (Dashed) */}
                <div className="es-card dashed-card" onClick={() => { }}>
                    <div className="dashed-content">
                        <div className="plus-circle">
                            <Plus size={32} />
                        </div>
                        <h3>Add New {activeTab === 'events' ? 'Event' : 'Service'}</h3>
                        <p>Create a listing now</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventsServices;
