import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    QrCode,
    CalendarCheck,
    Clock,
    Search,
    MapPin,
    Calendar as CalendarIcon,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Filter
} from 'lucide-react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import './TicketsBookings.css';

// --- Types ---
type ViewMode = 'attendee' | 'organizer';
type Section = 'tickets' | 'bookings';

// --- Mock Data ---
const MY_TICKETS = [
    {
        id: 't1',
        event: 'Neon Nights Festival',
        date: 'Dec 24, 2025',
        time: '8:00 PM',
        location: 'Grand Arena, Acc',
        type: 'VIP Pass',
        price: '₵450',
        status: 'valid',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 't2',
        event: 'Tech Summit Africa',
        date: 'Jan 15, 2026',
        time: '9:00 AM',
        location: 'Kempinski Hotel',
        type: 'Regular',
        price: '₵150',
        status: 'used',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
    }
];

const ISSUED_TICKETS_DATA = [
    { id: 'it1', holder: 'Sarah Mensah', type: 'VIP', status: 'Checked In', time: '19:45 PM', email: 'sarah.m@email.com' },
    { id: 'it2', holder: 'Kwame Ofori', type: 'Regular', status: 'Pending', time: '-', email: 'kwame.o@email.com' },
    { id: 'it3', holder: 'Emmanuel Yeboah', type: 'Regular', status: 'Pending', time: '-', email: 'e.yeboah@email.com' },
    { id: 'it4', holder: 'Ama Asante', type: 'VIP', status: 'Checked In', time: '20:10 PM', email: 'ama.a@email.com' },
    { id: 'it5', holder: 'John Doe', type: 'Free', status: 'Pending', time: '-', email: 'j.doe@email.com' },
];

const MY_BOOKINGS = [
    {
        id: 'b1',
        service: 'Full Body Massage',
        provider: 'Serenity Spa',
        date: 'Dec 10, 2025',
        time: '2:00 PM',
        status: 'Confirmed',
        price: '₵200',
        image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 'b2',
        service: 'Haircut & Beard Trim',
        provider: 'Fade Masters',
        date: 'Dec 12, 2025',
        time: '5:30 PM',
        status: 'Pending',
        price: '₵80',
        image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800'
    }
];

const INCOMING_BOOKINGS_DATA = [
    { id: 'ib1', client: 'Michael K.', service: 'Deep Tissue Massage', date: 'Dec 08, 2025', time: '10:00 AM', status: 'Pending', contact: '054-xxx-xxxx' },
    { id: 'ib2', client: 'Lisa A.', service: 'Facial Treatment', date: 'Dec 08, 2025', time: '11:30 AM', status: 'Confirmed', contact: '050-xxx-xxxx' },
    { id: 'ib3', client: 'David B.', service: 'Manicure', date: 'Dec 09, 2025', time: '09:00 AM', status: 'Rejected', contact: '024-xxx-xxxx' },
    { id: 'ib4', client: 'Sarah M.', service: 'Full Package', date: 'Dec 09, 2025', time: '02:00 PM', status: 'Confirmed', contact: '020-xxx-xxxx' },
];


const TicketsBookings: React.FC = () => {
    const navigate = useNavigate();
    const [section, setSection] = useState<Section>('tickets');
    const [viewMode, setViewMode] = useState<ViewMode>('attendee');
    const [searchTerm, setSearchTerm] = useState('');

    // State for interactive interactivity
    const [incomingBookings, setIncomingBookings] = useState(INCOMING_BOOKINGS_DATA);

    const handleApprove = (id: string) => {
        setIncomingBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b));
    };

    const handleReject = (id: string) => {
        setIncomingBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'Rejected' } : b));
    };

    const filteredTickets = ISSUED_TICKETS_DATA.filter(t =>
        t.holder.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredBookings = incomingBookings.filter(b =>
        b.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.service.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bookings-container">
            {/* Header */}
            <header className="bookings-header">
                <div>
                    <h1 className="bookings-title">Tickets & Bookings</h1>
                    <p className="bookings-subtitle">Manage your event access and service appointments.</p>
                </div>

                <div className="view-controls">
                    <button
                        className={`toggle-btn ${section === 'tickets' ? 'active' : ''}`}
                        onClick={() => setSection('tickets')}
                    >
                        Events
                    </button>
                    <button
                        className={`toggle-btn ${section === 'bookings' ? 'active' : ''}`}
                        onClick={() => setSection('bookings')}
                    >
                        Services
                    </button>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }}></div>
                    <button
                        className={`toggle-btn ${viewMode === 'attendee' ? 'active' : ''}`}
                        onClick={() => setViewMode('attendee')}
                    >
                        Customer View
                    </button>
                    <button
                        className={`toggle-btn ${viewMode === 'organizer' ? 'active' : ''}`}
                        onClick={() => setViewMode('organizer')}
                    >
                        Business View
                    </button>
                </div>
            </header>

            {/* Content Switcher */}
            {section === 'tickets' ? (
                viewMode === 'attendee' ? (
                    // Customer Tickets Grid
                    <div className="cards-grid">
                        {MY_TICKETS.map(ticket => (
                            <div key={ticket.id} className="booking-card">
                                <div className="card-image-container">
                                    <img src={ticket.image} alt={ticket.event} className="card-image" />
                                    <span className={`status-badge status-${ticket.status} card-overlay-badge`}>{ticket.status}</span>
                                </div>

                                <div className="card-content">
                                    <div className="card-top">
                                        <div>
                                            <h3 className="event-name">{ticket.event}</h3>
                                            <div className="event-detail"><CalendarIcon size={14} /> {ticket.date} • {ticket.time}</div>
                                            <div className="event-detail"><MapPin size={14} /> {ticket.location}</div>
                                        </div>
                                    </div>
                                    <div className="card-divider" />
                                    <div className="card-footer">
                                        <div className="price-container">
                                            <span className="ticket-type">{ticket.type}</span>
                                            <span className="price-tag">{ticket.price}</span>
                                        </div>
                                        <button className="qr-btn" title="View QR Code">
                                            <QrCode size={18} /> <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Ticket</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="booking-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', textAlign: 'center', gap: '1rem', minHeight: '380px' }}>
                            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                                <Search size={32} color="var(--text-secondary)" />
                            </div>
                            <h3 className="event-name">Find More Events</h3>
                            <Button variant="outline" onClick={() => navigate('/dashboard/services')}>Browse All</Button>
                        </div>
                    </div>
                ) : (
                    // Organizer Ticket List
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div style={{ flex: 1 }}>
                                <Input
                                    placeholder="Search attendees..."
                                    icon={<Search size={16} />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="primary" icon={<QrCode size={16} />}>Scan Ticket</Button>
                        </div>

                        <div className="bookings-table-container">
                            <table className="bookings-table">
                                <thead>
                                    <tr>
                                        <th>Attendee</th>
                                        <th>Ticket Type</th>
                                        <th>Status</th>
                                        <th>Check-In Time</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTickets.map(t => (
                                        <tr key={t.id}>
                                            <td>
                                                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.holder}</div>
                                                <div style={{ fontSize: '0.8rem' }}>{t.email}</div>
                                            </td>
                                            <td>{t.type}</td>
                                            <td><span className={`status-badge status-${t.status.toLowerCase().replace(' ', '-')}`}>{t.status}</span></td>
                                            <td style={{ fontFamily: 'monospace' }}>{t.time}</td>
                                            <td>
                                                <Button variant="ghost" style={{ padding: '0.5rem' }}><MoreVertical size={16} /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            ) : (
                viewMode === 'attendee' ? (
                    // Customer Bookings
                    <div className="cards-grid">
                        {MY_BOOKINGS.map(booking => (
                            <div key={booking.id} className="booking-card">
                                <div className="card-image-container">
                                    <img src={booking.image} alt={booking.service} className="card-image" />
                                    <span className={`status-badge status-${booking.status.toLowerCase()} card-overlay-badge`}>{booking.status}</span>
                                </div>
                                <div className="card-content">
                                    <div className="card-top">
                                        <div>
                                            <h3 className="event-name">{booking.service}</h3>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>{booking.provider}</p>
                                            <div className="event-detail" style={{ marginTop: '0.5rem' }}>
                                                <Clock size={14} /> {booking.date} • {booking.time}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-divider"></div>
                                    <div className="card-footer">
                                        <div className="price-container">
                                            <span className="ticket-type">Service Cost</span>
                                            <span className="price-tag">{booking.price}</span>
                                        </div>
                                        <Button variant="outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Reschedule</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="booking-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', textAlign: 'center', gap: '1rem', minHeight: '380px' }}>
                            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                                <CalendarCheck size={32} color="var(--text-secondary)" />
                            </div>
                            <h3 className="event-name">Book a Service</h3>
                            <Button variant="primary" onClick={() => navigate('/dashboard/services')}>Find Providers</Button>
                        </div>
                    </div>
                ) : (
                    // Business Bookings View
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div style={{ flex: 1 }}>
                                <Input
                                    placeholder="Search clients or services..."
                                    icon={<Search size={16} />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" icon={<Filter size={16} />}>Filter</Button>
                        </div>

                        <div className="bookings-table-container">
                            <table className="bookings-table">
                                <thead>
                                    <tr>
                                        <th>Client</th>
                                        <th>Service Details</th>
                                        <th>Status</th>
                                        <th>Contact</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.length > 0 ? filteredBookings.map(b => (
                                        <tr key={b.id}>
                                            <td>
                                                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{b.client}</div>
                                                <div style={{ fontSize: '0.8rem' }}>ID: {b.id.toUpperCase()}</div>
                                            </td>
                                            <td>
                                                <div style={{ color: 'var(--text-primary)' }}>{b.service}</div>
                                                <div className="event-detail"><CalendarIcon size={12} /> {b.date} • {b.time}</div>
                                            </td>
                                            <td><span className={`status-badge status-${b.status.toLowerCase()}`}>{b.status}</span></td>
                                            <td>{b.contact}</td>
                                            <td>
                                                {b.status === 'Pending' ? (
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button
                                                            onClick={() => handleApprove(b.id)}
                                                            style={{
                                                                padding: '0.4rem',
                                                                borderRadius: '8px',
                                                                border: '1px solid rgba(34, 197, 94, 0.2)',
                                                                background: 'rgba(34, 197, 94, 0.1)',
                                                                color: '#4ade80',
                                                                cursor: 'pointer'
                                                            }}
                                                            title="Approve"
                                                        >
                                                            <CheckCircle2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(b.id)}
                                                            style={{
                                                                padding: '0.4rem',
                                                                borderRadius: '8px',
                                                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                                                background: 'rgba(239, 68, 68, 0.1)',
                                                                color: '#f87171',
                                                                cursor: 'pointer'
                                                            }}
                                                            title="Reject"
                                                        >
                                                            <XCircle size={16} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <Button variant="ghost" style={{ padding: '0.5rem' }}><MoreVertical size={16} /></Button>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                                No bookings found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default TicketsBookings;
