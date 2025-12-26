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
    Briefcase,
    Phone,
    DollarSign,
    AlignLeft,
    Ticket
} from 'lucide-react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
import NumberStepper from '../../../components/NumberStepper/NumberStepper';
import AppAlert from '../../../components/AppAlert/AppAlert';
import './EventsServices.css';

// --- Types ---
type Tab = 'explore' | 'history' | 'manage';
type Category = 'all' | 'events' | 'services';

interface ManagedItem {
    id: number | string;
    type: string;
    title: string;
    description?: string;
    image?: string;
    contact?: string;
    date?: string;
    duration?: string;
    location?: string;
    price: string;
    status: string;
    sold?: number;
    time?: string;
    total?: number | null;
    category?: string;
    ticketType?: string;
    imageBg?: string;
    rating?: number;
    isUserCreated?: boolean;
}

// ... Mock Data ...
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
        spots: 'Limited',
        ticketType: 'Paid (Scanning)'
    },
    {
        id: 102,
        type: 'service',
        title: 'Premium Catering',
        duration: 'Custom',
        price: 'From ₵500',
        imageBg: 'linear-gradient(135deg, #FFD700, #B8860B)',
        category: 'Dining',
        rating: 4.9,
        ticketType: 'Paid (Standard)'
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
        spots: 'Open',
        ticketType: 'Paid (Scanning)'
    },
    {
        id: 104,
        type: 'service',
        title: 'Event Photography',
        duration: 'Hourly',
        price: '₵250/hr',
        imageBg: 'linear-gradient(135deg, #6AB04C, #BADC58)',
        category: 'Media',
        rating: 4.8,
        ticketType: 'Paid (Standard)'
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

const MANAGED_ITEMS: ManagedItem[] = [
    { id: 301, type: 'event', title: 'Neon Nights Festival', date: 'Dec 24, 2025', location: 'Grand Arena', price: '₵150', status: 'Active', sold: 450, total: 1000 },
    { id: 302, type: 'service', title: 'Haircut & Beard Trim', duration: '45 mins', price: '₵80', category: 'Grooming', status: 'Active', sold: 12, total: null },
    { id: 303, type: 'event', title: 'Tech Start Summit', date: 'Jan 15, 2026', location: 'Kempinski', price: 'Free', status: 'Draft', sold: 0, total: 200 },
];

const EventsServices: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('explore');

    const [filterCategory, setFilterCategory] = useState<Category>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Managed Items State based on Mock Data
    // Unified State for all items
    const [allEvents, setAllEvents] = useState<ManagedItem[]>([
        ...EXPLORE_ITEMS.map(item => ({ ...item, status: 'Active', sold: 0, total: 100 })),
        ...MANAGED_ITEMS.map(item => ({ ...item, isUserCreated: true }))
    ]);
    const [historyItems, setHistoryItems] = useState(HISTORY_ITEMS);

    // Detail Alert State
    const [detailItem, setDetailItem] = useState<ManagedItem | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState({
        type: 'event', // event or service
        title: '',
        description: '',
        image: '',
        contact: '',
        date: '',
        time: '',
        location: '',
        price: '',
        status: 'Active',
        category: 'General',
        ticketType: 'Paid (Scanning)', // Default value
        total: '', // Number of tickets/people
    });

    // Delete Confirmation State
    const [deleteAlert, setDeleteAlert] = useState<{ isOpen: boolean; itemId: number | null }>({
        isOpen: false,
        itemId: null
    });

    // Booking State
    const [bookingItem, setBookingItem] = useState<any>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [bookedIds, setBookedIds] = useState<number[]>([]);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadTicket = () => {
        setIsDownloading(true);
        // Simulate a premium download process
        setTimeout(() => {
            setIsDownloading(false);
            alert("Ticket downloaded successfully! (Simulation)");
        }, 2000);
    };

    const handleBook = (item: any) => {
        setBookingItem(item);
        setIsBookingOpen(true);
    };

    const confirmBooking = () => {
        setIsBookingOpen(false);
        setIsProcessing(true);

        // Simulate premium processing delay
        setTimeout(() => {
            if (bookingItem) {
                const newHistoryItem = {
                    id: Date.now(),
                    type: bookingItem.type,
                    title: bookingItem.title,
                    date: bookingItem.date || bookingItem.duration || 'Today',
                    location: bookingItem.location || 'Online',
                    status: 'Attended',
                    myRating: 0
                };
                setHistoryItems(prev => [newHistoryItem, ...prev]);
                setBookedIds(prev => [...prev, bookingItem.id]);
            }
            setIsProcessing(false);
            setBookingSuccess(true);
        }, 1500);
    };

    const openCreateModal = (type: 'event' | 'service') => {
        setEditingItem(null);
        setFormData({
            type,
            title: '',
            description: '',
            image: '',
            contact: '',
            date: '',
            time: '',
            location: '',
            price: '',
            status: 'Active',
            category: 'General',
            ticketType: 'Paid (Digital Pass)',
            total: ''
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item: any) => {
        setEditingItem(item);
        setFormData({
            type: item.type,
            title: item.title,
            description: item.description || '',
            image: item.image || '',
            contact: item.contact || '',
            date: item.date || item.duration || '',
            time: item.time || '',
            location: item.location || '',
            price: item.price || '',
            status: item.status,
            category: item.category || 'General',
            ticketType: item.ticketType || 'Paid (Scanning)',
            total: item.total?.toString() || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setDeleteAlert({ isOpen: true, itemId: id });
    };

    const confirmDelete = () => {
        if (deleteAlert.itemId !== null) {
            setAllEvents(prev => prev.filter(item => item.id !== deleteAlert.itemId));
        }
        setDeleteAlert({ isOpen: false, itemId: null });
    };

    const cancelDelete = () => {
        setDeleteAlert({ isOpen: false, itemId: null });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            // Update
            setAllEvents(prev => prev.map(item =>
                item.id === editingItem.id ? {
                    ...item,
                    ...formData,
                    total: formData.total ? parseInt(formData.total as string) : item.total,
                    ...(formData.type === 'service' ? { duration: formData.date } : { date: formData.date })
                } : item
            ));
        } else {
            // Create
            const newItem: ManagedItem = {
                id: Date.now(),
                ...formData,
                sold: 0,
                total: formData.total ? parseInt(formData.total as string) : (formData.type === 'event' ? 100 : null),
                isUserCreated: true,
                ...(formData.type === 'service' ? { duration: formData.date } : { date: formData.date }),
                imageBg: formData.type === 'event' ? 'linear-gradient(45deg, #8b5cf6, #6366f1)' : 'linear-gradient(135deg, #a78bfa, #8b5cf6)'
            };
            setAllEvents(prev => [newItem, ...prev]);
        }
        setIsModalOpen(false);
    };

    const renderExplore = () => (
        <div className="es-grid animate-fade-in">
            {allEvents.filter(i =>
                i.status === 'Active' &&
                (filterCategory === 'all' || (filterCategory === 'events' && i.type === 'event') || (filterCategory === 'services' && i.type === 'service')) &&
                i.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).map(item => (
                <div key={item.id} className={`es-card explore-card ${bookedIds.includes(item.id as number) ? 'is-booked' : ''}`} style={{ cursor: 'default' }}>
                    <div className="es-card-image" style={{ background: item.imageBg }}>
                        {bookedIds.includes(item.id as number) ? (
                            <span className="booked-badge"><CheckCircle size={14} /> BOOKED</span>
                        ) : (
                            <span className="category-badge">{item.category}</span>
                        )}
                        {item.type === 'service' && <span className="service-icon"><Star size={14} fill="currentColor" /> {item.rating}</span>}
                    </div>
                    <div className="es-card-content">
                        <div className="es-card-header">
                            <h3>{item.title}</h3>
                            <button
                                className="icon-btn-ghost"
                                onClick={() => {
                                    setDetailItem(item);
                                    setIsDetailOpen(true);
                                }}
                            >
                                <MoreVertical size={16} />
                            </button>
                        </div>
                        <div className="es-meta">
                            {item.type === 'event' ? (
                                <>
                                    <span><Calendar size={14} /> {item.date} {item.time && `@ ${item.time}`}</span>
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
                            <Button
                                variant={bookedIds.includes(item.id as number) ? "outline" : "primary"}
                                className="book-btn-sm"
                                onClick={() => handleBook(item)}
                                disabled={bookedIds.includes(item.id as number)}
                            >
                                {bookedIds.includes(item.id as number) ? 'Booked' : (item.type === 'event' ? 'Book Ticket' : 'Book Now')}
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderHistory = () => (
        <div className="es-list animate-fade-in">
            {historyItems.filter(item => item.status === 'Attended' || item.status === 'Completed').map(item => (
                <div key={item.id} className="history-item">
                    <div className="history-icon">
                        <CheckCircle size={24} color="currentColor" />
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
                </div>
            ))}
        </div>
    );

    const renderManage = () => (
        <div className="es-grid animate-fade-in">
            {/* Create Actions */}
            <div className="es-card dashed-card" onClick={() => openCreateModal('event')}>
                <div className="dashed-content">
                    <div className="plus-circle event-theme">
                        <Calendar size={32} />
                    </div>
                    <h3>Create Event</h3>
                    <p>Host a party, workshop, or show</p>
                    <div className="action-tag">Get Started <ArrowRight size={14} /></div>
                </div>
            </div>

            <div className="es-card dashed-card" onClick={() => openCreateModal('service')}>
                <div className="dashed-content">
                    <div className="plus-circle service-theme">
                        <Briefcase size={32} />
                    </div>
                    <h3>Create Service</h3>
                    <p>Offer catering, photography, etc.</p>
                    <div className="action-tag">Get Started <ArrowRight size={14} /></div>
                </div>
            </div>
            {allEvents.filter(item => item.isUserCreated).map(item => (
                <div key={item.id} className="es-card">
                    <div className="es-card-image">
                        <div className="placeholder-img" style={{ background: item.imageBg }}>
                            <ImageIcon size={32} color="rgba(255,255,255,0.2)" />
                        </div>
                        <span className={`status-tag ${item.status.toLowerCase()}`}>{item.status}</span>
                    </div>
                    <div className="es-card-content">
                        <div className="es-card-header">
                            <h3>{item.title}</h3>
                            <button
                                className="icon-btn-ghost"
                                onClick={() => {
                                    setDetailItem(item);
                                    setIsDetailOpen(true);
                                }}
                            >
                                <MoreVertical size={16} />
                            </button>
                        </div>
                        <div className="es-meta">
                            {item.type === 'event' ? (
                                <>
                                    <span><Calendar size={14} /> {item.date} {item.time && `@ ${item.time}`}</span>
                                    <span><MapPin size={14} /> {item.location}</span>
                                </>
                            ) : (
                                <>
                                    <span><Clock size={14} /> {(item as any).duration}</span>
                                    <span><Tag size={14} /> {(item as any).category}</span>
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
                                <button className="icon-btn-edit" onClick={() => openEditModal(item)}><Edit2 size={16} /></button>
                                <button className="icon-btn-del" onClick={() => handleDelete(item.id as number)}><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

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
                        <div>
                            <button
                                className={`filter-chip ${filterCategory === 'all' ? 'active' : ''}`}
                                onClick={() => setFilterCategory('all')}
                            >
                                All
                            </button>
                        </div>
                        <div>
                            <button
                                className={`filter-chip ${filterCategory === 'events' ? 'active' : ''}`}
                                onClick={() => setFilterCategory('events')}
                            >
                                Events Only
                            </button>
                        </div>
                        <div>
                            <button
                                className={`filter-chip ${filterCategory === 'services' ? 'active' : ''}`}
                                onClick={() => setFilterCategory('services')}
                            >
                                Services Only
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="es-content">
                {activeTab === 'explore' && renderExplore()}
                {activeTab === 'history' && renderHistory()}
                {activeTab === 'manage' && renderManage()}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 style={{
                                background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                fontSize: '1.75rem',
                                fontWeight: '700'
                            }}>
                                {editingItem ? 'Edit Item' : `Create ${formData.type === 'event' ? 'Event' : 'Service'}`}
                            </h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
                        </div>
                        <form onSubmit={handleSave}>
                            <div className="modal-body revamped-body">
                                <div className="form-grid revamped-grid">
                                    {/* Left Column: Image Upload & Preview */}
                                    <div className="image-upload-area sticky-upload">
                                        <div
                                            className="image-upload-wrapper revamped-upload"
                                            onClick={() => document.getElementById('imageInput')?.click()}
                                            style={{ height: '320px' }}
                                        >
                                            {formData.image ? (
                                                <img src={formData.image} alt="Preview" className="image-preview" />
                                            ) : (
                                                <div className="upload-placeholder">
                                                    <ImageIcon size={40} className="upload-icon" />
                                                    <p>Click to upload cover image</p>
                                                    <span>Optimal: 1200 x 600px</span>
                                                </div>
                                            )}
                                            <input
                                                id="imageInput"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                style={{ display: 'none' }}
                                            />
                                        </div>

                                        {/* Relocated Actions */}
                                        <div className="side-actions-container side-by-side">
                                            <Button type="submit" variant="primary" className="submit-btn-premium flex-1">
                                                {editingItem ? 'Save' : 'Create'}
                                            </Button>
                                            <button
                                                type="button"
                                                className="cancel-btn-outline flex-1"
                                                onClick={() => setIsModalOpen(false)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right Column: High-End Form Layout */}
                                    <div className="form-fields-container">
                                        {/* SECTION 1: IDENTITY */}
                                        <div className="revamped-section">
                                            <div className="revamped-section-header">
                                                <div className="step-indicator">1</div>
                                                <h4>Identity & Details</h4>
                                            </div>
                                            <div className="glass-form-card">
                                                <Input
                                                    label={formData.type === 'event' ? "Event Name" : "Service Name"}
                                                    icon={formData.type === 'event' ? <Calendar size={18} /> : <Briefcase size={18} />}
                                                    placeholder={formData.type === 'event' ? "Summer Bash 2024" : "Premium Catering"}
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    required
                                                    fullWidth
                                                />
                                                <div style={{ marginTop: '1.25rem' }}>
                                                    <Input
                                                        label="Description"
                                                        icon={<AlignLeft size={18} />}
                                                        placeholder="Describe what makes this special..."
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                        multiline
                                                        rows={4}
                                                        fullWidth
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* SECTION 2: LOGISTICS */}
                                        <div className="revamped-section">
                                            <div className="revamped-section-header">
                                                <div className="step-indicator">2</div>
                                                <h4>Logistics & Venue</h4>
                                            </div>
                                            <div className="glass-form-card">
                                                <div className="form-row-2">
                                                    <Input
                                                        label={formData.type === 'event' ? "Event Date" : "Duration"}
                                                        icon={formData.type === 'event' ? <Calendar size={18} /> : <Clock size={18} />}
                                                        placeholder={formData.type === 'event' ? "Select Date" : "e.g. 2 hours"}
                                                        value={formData.date}
                                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                        type={formData.type === 'event' ? "date" : "text"}
                                                        required
                                                    />
                                                    <Input
                                                        label="Event Time"
                                                        icon={<Clock size={18} />}
                                                        placeholder="Select Time"
                                                        value={formData.time}
                                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                        type="time"
                                                    />
                                                </div>
                                                <div className="form-row-2" style={{ marginTop: '1.25rem' }}>
                                                    <Input
                                                        label="Location"
                                                        icon={<MapPin size={18} />}
                                                        placeholder="Venue name or Address"
                                                        value={formData.location}
                                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                    />
                                                    <Input
                                                        label="Category"
                                                        icon={<Tag size={18} />}
                                                        placeholder="Type a category..."
                                                        value={formData.category}
                                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    />
                                                </div>
                                                <div style={{ marginTop: '1.25rem' }}>
                                                    <Input
                                                        label="Contact Details"
                                                        icon={<Phone size={18} />}
                                                        placeholder="Phone number or Email"
                                                        value={formData.contact}
                                                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                                        fullWidth
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* SECTION 3: ADMISSION */}
                                        <div className="revamped-section">
                                            <div className="revamped-section-header">
                                                <div className="step-indicator">3</div>
                                                <h4>Admission & Tickets</h4>
                                            </div>
                                            <div className="glass-form-card">
                                                <div className="form-row-2">
                                                    <Input
                                                        label="Pricing"
                                                        icon={<DollarSign size={18} />}
                                                        placeholder="e.g. ₵150 or Free"
                                                        value={formData.price}
                                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                    />
                                                    <Select
                                                        label="Admit Method"
                                                        icon={<Ticket size={18} />}
                                                        placeholder="Choose access type"
                                                        value={formData.ticketType}
                                                        onChange={(val) => setFormData({ ...formData, ticketType: val })}
                                                        options={[
                                                            { value: 'Paid (Digital Pass)', label: 'Paid - Digital Pass' },
                                                            { value: 'Paid (QR Scan)', label: 'Paid - QR Scan Required' },
                                                            { value: 'Free (RSVP)', label: 'Free - RSVP Only' },
                                                            { value: 'Free (QR Scan)', label: 'Free - QR Scan Required' }
                                                        ]}
                                                    />
                                                </div>
                                                <div style={{ marginTop: '1.25rem' }}>
                                                    <NumberStepper
                                                        label="Total Attendee Limit"
                                                        icon={<CheckCircle size={18} />}
                                                        value={formData.total || 0}
                                                        onChange={(val) => setFormData({ ...formData, total: val })}
                                                        min={1}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Booking Processing Overlay */}
            {
                isProcessing && (
                    <div className="processing-overlay">
                        <div className="processing-content">
                            <div className="premium-loader"></div>
                            <p>Securing your spot...</p>
                        </div>
                    </div>
                )
            }

            {/* Delete Confirmation Alert */}
            <AppAlert
                isOpen={deleteAlert.isOpen}
                title="Delete Item"
                message="Are you sure you want to delete this item? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                variant="danger"
            />

            {/* Booking Confirmation Alert */}
            <AppAlert
                isOpen={isBookingOpen}
                title="Confirm Booking"
                message={`Are you sure you want to book "${bookingItem?.title}" for ${bookingItem?.price}?`}
                confirmText="Confirm Now"
                cancelText="Maybe Later"
                onConfirm={confirmBooking}
                onCancel={() => setIsBookingOpen(false)}
                variant="info"
            />

            {/* Booking Success Alert */}
            <AppAlert
                isOpen={bookingSuccess}
                title="Booking Successful!"
                message=""
                confirmText="Done"
                cancelText=""
                onConfirm={() => setBookingSuccess(false)}
                onCancel={() => setBookingSuccess(false)}
                variant="info"
                maxWidth="650px"
            >
                <div className="premium-ticket-container">
                    <div className="ticket-top">
                        <div className="ticket-header-content">
                            <span className="ticket-type-label">{bookingItem?.type === 'event' ? 'EVENT TICKET' : 'SERVICE PASS'}</span>
                            <h2>{bookingItem?.title}</h2>
                        </div>
                        <div className="ticket-confetti-icon">
                            <CheckCircle size={40} color="#8b5cf6" />
                        </div>
                    </div>

                    <div className="ticket-divider">
                        <div className="divider-hole left"></div>
                        <div className="divider-line"></div>
                        <div className="divider-hole right"></div>
                    </div>

                    <div className="ticket-bottom">
                        <div className="ticket-info-grid">
                            <div className="ticket-info-item">
                                <span className="label">Date & Time</span>
                                <span className="value">{bookingItem?.date || bookingItem?.duration || 'Dec 24, 2025'} {bookingItem?.time && `@ ${bookingItem?.time}`}</span>
                            </div>
                            <div className="ticket-info-item">
                                <span className="label">Ticket ID</span>
                                <span className="value">#Z-{Math.floor(Math.random() * 90000) + 10000}</span>
                            </div>
                            <div className="ticket-info-item">
                                <span className="label">Location</span>
                                <span className="value">{bookingItem?.location || 'Virtual / Online'}</span>
                            </div>
                            <div className="ticket-info-item">
                                <span className="label">Price</span>
                                <span className="value">{bookingItem?.price}</span>
                            </div>
                        </div>

                        {bookingItem?.ticketType?.includes('QR Scan') ? (
                            <div className="ticket-qr-section" style={{ marginTop: '1.5rem' }}>
                                <div className="fake-qr-code">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className={`qr-pixel ${Math.random() > 0.5 ? 'active' : ''}`}></div>
                                    ))}
                                </div>
                                <p className="ticket-footer-text">Scan at entryway for access</p>
                            </div>
                        ) : (
                            <div className="ticket-standard-footer">
                                <CheckCircle size={28} color="#8b5cf6" style={{ marginBottom: '0.5rem' }} />
                                <p className="ticket-footer-text" style={{ color: '#fff', fontSize: '0.85rem', opacity: 1, fontWeight: 600 }}>Your digital pass is confirmed</p>
                                <p className="ticket-footer-text">Present this at the venue</p>
                            </div>
                        )}

                        <div className="ticket-download-section">
                            <Button
                                variant="outline"
                                className="download-btn-full"
                                onClick={handleDownloadTicket}
                                disabled={isDownloading}
                            >
                                {isDownloading ? "Generating Image..." : "Download as Image"}
                            </Button>
                        </div>
                    </div>
                </div>
            </AppAlert>

            {/* Detail Alert (3-dots) */}
            <AppAlert
                isOpen={isDetailOpen}
                title="Item Details"
                message=""
                confirmText="Got it"
                cancelText=""
                onConfirm={() => setIsDetailOpen(false)}
                onCancel={() => setIsDetailOpen(false)}
                variant="info"
            >
                {detailItem && (
                    <div className="detail-card-info" style={{ textAlign: 'left', padding: '1rem 0' }}>
                        <div style={{ marginBottom: '1.25rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ticket Type & Description</span>
                            <h4 style={{ color: '#8b5cf6', margin: '0.25rem 0 0.5rem 0' }}>{detailItem.ticketType || 'Standard Entry'}</h4>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6' }}>{detailItem.description || 'No description provided.'}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
                            <div>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Date & Time</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', color: 'white' }}>
                                    <Calendar size={14} color="#8b5cf6" />
                                    <span>{detailItem.date} {detailItem.time && `@ ${detailItem.time}`}</span>
                                </div>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Location</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', color: 'white' }}>
                                    <MapPin size={14} color="#8b5cf6" />
                                    <span>{detailItem.location || 'Virtual / Online'}</span>
                                </div>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Contact Person</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', color: 'white' }}>
                                    <Phone size={14} color="#8b5cf6" />
                                    <span>{detailItem.contact || 'Not listed'}</span>
                                </div>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Category</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', color: 'white' }}>
                                    <Tag size={14} color="#8b5cf6" />
                                    <span>{detailItem.category || (detailItem.type === 'event' ? 'Social' : 'Professional')}</span>
                                </div>
                            </div>
                            <div>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Capacity</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', color: 'white' }}>
                                    <CheckCircle size={14} color="#8b5cf6" />
                                    <span>{detailItem.total || 'Unlimited'} People</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AppAlert>
        </div >
    );
};

export default EventsServices;
