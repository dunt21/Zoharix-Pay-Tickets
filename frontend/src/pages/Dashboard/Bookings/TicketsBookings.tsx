import React, { useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
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
} from 'lucide-react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import AppAlert from '../../../components/AppAlert/AppAlert';
import './TicketsBookings.css';

// Types

type ViewMode = 'attendee' | 'organizer';
type Section = 'tickets' | 'bookings';

type IssuedTicket = {
  id: string;
  holder: string;
  email: string;
  type: string;
  status: 'Checked In' | 'Pending';
  time: string;
};

type MyTicket = {
  id: string;
  name: string;
  event: string;
  date: string;
  time: string;
  location: string;
  type: string;
  price: string;
  status: 'valid' | 'used' | 'expired';
  image: string;
  code: string;
};

type MyBooking = {
  id: string;
  service: string;
  provider: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Rejected' | 'Reschedule Requested';
  price: string;
  image: string;
  isRescheduling?: boolean;
};

type IncomingBooking = {
  id: string;
  client: string;
  service: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Rejected' | 'Reschedule Requested';
  contact: string;
  price: string;
};

// Mock Data

const MY_TICKETS: MyTicket[] = [
  {
    id: 't1',
    name: 'John Doe',
    event: 'Neon Nights Festival',
    date: 'Dec 24 2025',
    time: '8:00 PM',
    location: 'Grand Arena Acc',
    type: 'VIP Pass',
    price: '₵450',
    status: 'valid',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    code: 'NEON-0001-VIP',
  },
  {
    id: 't2',
    name: 'Jane Smith',
    event: 'Tech Summit Africa',
    date: 'Jan 15 2026',
    time: '9:00 AM',
    location: 'Kempinski Hotel',
    type: 'Regular',
    price: '₵150',
    status: 'used',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    code: 'TSA-0234-REG',
  },
];

const ISSUED_TICKETS_DATA: IssuedTicket[] = [
  {
    id: 'it1',
    holder: 'Sarah Mensah',
    type: 'VIP',
    status: 'Checked In',
    time: '19:45 PM',
    email: 'sarah.m@email.com',
  },
  {
    id: 'it2',
    holder: 'Kwame Ofori',
    type: 'Regular',
    status: 'Pending',
    time: '-',
    email: 'kwame.o@email.com',
  },
  {
    id: 'it3',
    holder: 'Emmanuel Yeboah',
    type: 'Regular',
    status: 'Pending',
    time: '-',
    email: 'e.yeboah@email.com',
  },
  {
    id: 'it4',
    holder: 'Ama Asante',
    type: 'VIP',
    status: 'Checked In',
    time: '20:10 PM',
    email: 'ama.a@email.com',
  },
  {
    id: 'it5',
    holder: 'John Doe',
    type: 'Free',
    status: 'Pending',
    time: '-',
    email: 'j.doe@email.com',
  },
];

const MY_BOOKINGS: MyBooking[] = [
  {
    id: 'b1',
    service: 'Full Body Massage',
    provider: 'Serenity Spa',
    date: 'Dec 10 2025',
    time: '2:00 PM',
    status: 'Confirmed',
    price: '₵200',
    image:
      'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'b2',
    service: 'Haircut & Beard Trim',
    provider: 'Fade Masters',
    date: 'Dec 12 2025',
    time: '5:30 PM',
    status: 'Pending',
    price: '₵80',
    image:
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800',
  },
];

const INCOMING_BOOKINGS_DATA: IncomingBooking[] = [
  {
    id: 'ib1',
    client: 'Alinko Tech',
    service: 'Professional Massage',
    date: 'Dec 31, 2024',
    time: '14:00',
    status: 'Reschedule Requested',
    contact: '054 123 4567',
    price: '₵250',
  },
  {
    id: 'ib2',
    client: 'Sarah Mensah',
    service: 'Haircut & Styling',
    date: 'Jan 02, 2025',
    time: '10:00',
    status: 'Pending',
    contact: '020 987 6543',
    price: '₵120',
  },
  {
    id: 'ib3',
    client: 'David Osei',
    service: 'Wedding Photography',
    date: 'Jan 12, 2025',
    time: '08:00',
    status: 'Confirmed',
    contact: '024 445 6677',
    price: '₵1,500',
  },
];

const TicketsBookings: React.FC = () => {
  const navigate = useNavigate();

  const [section, setSection] = useState<Section>('tickets');
  const [viewMode, setViewMode] = useState<ViewMode>('attendee');
  const [searchTerm, setSearchTerm] = useState('');

  const [incomingBookings, setIncomingBookings] = useState(INCOMING_BOOKINGS_DATA);
  const [issuedTickets, setIssuedTickets] = useState(ISSUED_TICKETS_DATA);
  const [myTickets] = useState(MY_TICKETS);
  const [myBookings, setMyBookings] = useState(MY_BOOKINGS);

  // Modals
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [scanCode, setScanCode] = useState('');

  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<MyTicket | null>(null);

  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<MyBooking | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);

  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePdfDownload = async () => {
    if (!ticketRef.current || !selectedTicket) return;

    try {
      const { toPng } = await import('html-to-image');

      // Ensure images are loaded
      const images = ticketRef.current.getElementsByTagName('img');
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      const dataUrl = await toPng(ticketRef.current, {
        pixelRatio: 3,
        backgroundColor: '#000000',
        cacheBust: true,
        style: {
          borderRadius: '0', // Ensure clean edges for PDF
        }
      });

      const img = new Image();
      img.src = dataUrl;

      await new Promise(resolve => { img.onload = resolve; });

      const pdf = new jsPDF({
        orientation: img.width > img.height ? 'l' : 'p',
        unit: 'px',
        format: [img.width / 3, img.height / 3],
      });

      pdf.addImage(dataUrl, 'PNG', 0, 0, img.width / 3, img.height / 3);
      pdf.save(`${selectedTicket.event.replace(/\s+/g, '_')}_Ticket.pdf`);

      setTimeout(() => setTicketModalOpen(false), 500);
    } catch (error) {
      console.error('High-fidelity PDF generation failure:', error);
      alert("Something went wrong with the high-fidelity download. Please try again.");
    }
  };

  const filteredTickets = useMemo(
    () =>
      issuedTickets.filter(
        (t) =>
          t.holder.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.email.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [issuedTickets, searchTerm],
  );

  const filteredBookings = useMemo(
    () =>
      incomingBookings.filter(
        (b) =>
          b.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.service.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [incomingBookings, searchTerm],
  );

  // Business / Organizer Logic
  const [actionModal, setActionModal] = useState<{
    open: boolean;
    type: 'approve' | 'reject' | 'confirm_reschedule';
    id: string | null
  }>({ open: false, type: 'approve', id: null });

  const openActionModal = (type: 'approve' | 'reject' | 'confirm_reschedule', id: string) => {
    setActionModal({ open: true, type, id });
  };

  const confirmAction = () => {
    if (!actionModal.id) return;
    setIncomingBookings((prev) =>
      prev.map((b) => {
        if (b.id === actionModal.id) {
          if (actionModal.type === 'approve' || actionModal.type === 'confirm_reschedule') {
            return { ...b, status: 'Confirmed' };
          }
          return { ...b, status: 'Rejected' };
        }
        return b;
      })
    );
    setActionModal({ open: false, type: 'approve', id: null });
  };

  const handleApprove = (id: string) => openActionModal('approve', id);
  const handleReject = (id: string) => openActionModal('reject', id);
  const handleConfirmReschedule = (id: string) => openActionModal('confirm_reschedule', id);

  const openTicketModal = (ticket: MyTicket) => {
    setSelectedTicket(ticket);
    setTicketModalOpen(true);
  };

  const openScanModal = () => {
    setScanCode('');
    setScanModalOpen(true);
  };

  const confirmScan = () => {
    if (!scanCode.trim()) return;
    // Simulate verifying ticket and marking checked-in
    setIssuedTickets((prev) =>
      prev.map((t) =>
        t.id.toLowerCase() === scanCode.trim().toLowerCase() ||
          t.email.toLowerCase() === scanCode.trim().toLowerCase()
          ? { ...t, status: 'Checked In', time: new Date().toLocaleTimeString() }
          : t,
      ),
    );
    setScanModalOpen(false);
  };

  const openReschedule = (booking: MyBooking) => {
    setSelectedBooking(booking);
    setNewDate('');
    setNewTime('');
    setRescheduleModalOpen(true);
  };

  const confirmReschedule = () => {
    if (!selectedBooking) return;
    if (!newDate || !newTime) return;

    // Simulate real-world request process
    setMyBookings((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id
          ? {
            ...b,
            date: newDate,
            time: newTime,
            status: 'Pending',
            isRescheduling: true // Internal flag for UI if needed
          }
          : b
      )
    );

    // Optional: show a small toast or alert in a real app
    setRescheduleSuccess(true);

    setTimeout(() => {
      setRescheduleModalOpen(false);
      setRescheduleSuccess(false);
    }, 2000);
  };

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
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }} />
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
            {myTickets.map((ticket) => (
              <div key={ticket.id} className="booking-card">
                <div className="card-image-container">
                  <img src={ticket.image} alt={ticket.event} className="card-image" crossOrigin="anonymous" />
                  <span className={`status-badge status-${ticket.status} card-overlay-badge`}>
                    {ticket.status}
                  </span>
                </div>

                <div className="card-content">
                  <div className="card-top">
                    <div>
                      <h3 className="event-name">{ticket.event}</h3>
                      <div className="event-detail">
                        <CalendarIcon size={14} /> {ticket.date} • {ticket.time}
                      </div>
                      <div className="event-detail">
                        <MapPin size={14} /> {ticket.location}
                      </div>
                    </div>
                  </div>
                  <div className="card-divider" />
                  <div className="card-footer">
                    <div className="price-container">
                      <span className="ticket-type">{ticket.type}</span>
                      <span className="price-tag">{ticket.price}</span>
                    </div>
                    <button className="qr-btn" title="View Ticket" onClick={() => openTicketModal(ticket)}>
                      <QrCode size={18} />{' '}
                      <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Ticket</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="booking-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderStyle: 'dashed',
                textAlign: 'center',
                gap: '1rem',
                minHeight: '380px',
              }}
            >
              <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                <Search size={32} color="var(--text-secondary)" />
              </div>
              <h3 className="event-name">Find More Events</h3>
              <Button variant="outline" onClick={() => navigate('/dashboard/services')}>
                Browse All
              </Button>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="primary" icon={<QrCode size={16} />} onClick={openScanModal}>
                Scan Ticket
              </Button>
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
                  {filteredTickets.map((t) => (
                    <tr key={t.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.holder}</div>
                        <div style={{ fontSize: '0.8rem' }}>{t.email}</div>
                      </td>
                      <td>{t.type}</td>
                      <td>
                        <span className={`status-badge status-${t.status.toLowerCase().replace(' ', '-')}`}>{t.status}</span>
                      </td>
                      <td style={{ fontFamily: 'monospace' }}>{t.time}</td>
                      <td>
                        <Button variant="ghost" style={{ padding: '0.5rem' }}>
                          <MoreVertical size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      ) : viewMode === 'attendee' ? (
        // Customer Bookings
        <div className="cards-grid">
          {myBookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="card-image-container">
                <img src={booking.image} alt={booking.service} className="card-image" crossOrigin="anonymous" />
                <span
                  className={`status-badge status-${booking.status.toLowerCase().replace(/\s+/g, '_')} ${booking.status === 'Pending' ? 'pulse-request' : ''} card-overlay-badge`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="card-content">
                <div className="card-top">
                  <div>
                    <h3 className="event-name">{booking.service}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>
                      {booking.provider}
                    </p>
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
                  <Button
                    variant="outline"
                    style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                    onClick={() => openReschedule(booking)}
                  >
                    Reschedule
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div
            className="booking-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderStyle: 'dashed',
              textAlign: 'center',
              gap: '1rem',
              minHeight: '380px',
            }}
          >
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
              <CalendarCheck size={32} color="var(--text-secondary)" />
            </div>
            <h3 className="event-name">Book a Service</h3>
            <Button variant="primary" onClick={() => navigate('/dashboard/services')}>
              Find Providers
            </Button>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Filter Removed */}
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
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{b.client}</div>
                        <div style={{ fontSize: '0.8rem' }}>ID: {b.id.toUpperCase()}</div>
                      </td>
                      <td>
                        <div style={{ color: 'var(--text-primary)' }}>{b.service}</div>
                        <div className="event-detail">
                          <CalendarIcon size={12} /> {b.date} • {b.time}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge status-${b.status.toLowerCase().replace(/\s+/g, '_')} ${b.status === 'Reschedule Requested' ? 'pulse-request' : ''}`}>
                          {b.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{b.contact}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                          {b.status === 'Reschedule Requested' ? (
                            <>
                              <button
                                onClick={() => handleConfirmReschedule(b.id)}
                                style={{
                                  padding: '0.5rem',
                                  borderRadius: '10px',
                                  border: '1px solid rgba(139, 92, 246, 0.3)',
                                  background: 'rgba(139, 92, 246, 0.1)',
                                  color: '#a78bfa',
                                  cursor: 'pointer',
                                }}
                                title="Confirm Reschedule"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                              <button
                                onClick={() => handleReject(b.id)}
                                style={{
                                  padding: '0.5rem',
                                  borderRadius: '10px',
                                  border: '1px solid rgba(239, 68, 68, 0.2)',
                                  background: 'rgba(239, 68, 68, 0.05)',
                                  color: '#f87171',
                                  cursor: 'pointer',
                                }}
                                title="Reject"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          ) : b.status === 'Pending' ? (
                            <>
                              <button
                                onClick={() => handleApprove(b.id)}
                                style={{
                                  padding: '0.5rem',
                                  borderRadius: '10px',
                                  border: '1px solid rgba(34, 197, 94, 0.2)',
                                  background: 'rgba(34, 197, 94, 0.1)',
                                  color: '#4ade80',
                                  cursor: 'pointer',
                                }}
                                title="Approve"
                              >
                                <CheckCircle2 size={18} />
                              </button>
                              <button
                                onClick={() => handleReject(b.id)}
                                style={{
                                  padding: '0.5rem',
                                  borderRadius: '10px',
                                  border: '1px solid rgba(239, 68, 68, 0.2)',
                                  background: 'rgba(239, 68, 68, 0.05)',
                                  color: '#f87171',
                                  cursor: 'pointer',
                                }}
                                title="Decline"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          ) : (
                            <span style={{ fontSize: '0.75rem', opacity: 0.5 }}>Processed</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
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
      )}

      {/* Scan Modal */}
      <AppAlert
        isOpen={scanModalOpen}
        title="Scan or Enter Ticket Code"
        message="For demo, enter an attendee email or ticket id (e.g. it2) to mark as Checked In."
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={confirmScan}
        onCancel={() => setScanModalOpen(false)}
        variant="info"
      >
        <div style={{ marginTop: '1rem' }}>
          <Input
            placeholder="Enter ticket id or attendee email..."
            value={scanCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setScanCode(e.target.value)}
          />
        </div>
      </AppAlert>

      {/* Ticket Modal */}
      <AppAlert
        isOpen={ticketModalOpen && !!selectedTicket}
        title="Ticket Details"
        message=""
        confirmText="Download"
        cancelText="Copy Code"
        onConfirm={handlePdfDownload}
        onCancel={() => {
          if (selectedTicket) {
            navigator.clipboard.writeText(selectedTicket.code).catch(() => { });
          }
          setTicketModalOpen(false);
        }}
        variant="info"
      >
        {selectedTicket && (
          <div className="ticket-preview" ref={ticketRef} style={{ background: '#000', borderRadius: '12px', padding: '1rem' }}>
            <img
              src={`${selectedTicket.image}&t=${Date.now()}`}
              alt={selectedTicket.event}
              className="ticket-image"
              crossOrigin="anonymous"
              style={{ borderRadius: '8px' }}
            />
            <div className="ticket-info">
              <h4 className="event-name">{selectedTicket.event}</h4>
              <div className="event-detail">
                <CalendarIcon size={14} /> {selectedTicket.date} • {selectedTicket.time}
              </div>
              <div className="event-detail">
                <MapPin size={14} /> {selectedTicket.location}
              </div>
              <div className="event-detail">Code: {selectedTicket.code}</div>
              <div className="event-detail">Type: {selectedTicket.type}</div>
            </div>
          </div>
        )}
      </AppAlert>

      {/* Reschedule Modal */}
      <AppAlert
        isOpen={rescheduleModalOpen && !!selectedBooking}
        title="Reschedule Appointment"
        message="Request a new date and time. Your provider will be notified to confirm availability."
        confirmText={rescheduleSuccess ? "" : "Send Request"}
        cancelText={rescheduleSuccess ? "" : "Cancel"}
        onConfirm={confirmReschedule}
        onCancel={() => setRescheduleModalOpen(false)}
        variant="info"
        maxWidth="500px"
      >
        {selectedBooking && !rescheduleSuccess ? (
          <div className="reschedule-modal-content" style={{ marginTop: '1.5rem', textAlign: 'left' }}>
            <div className="current-details-box" style={{
              padding: '1rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
              marginBottom: '1.5rem'
            }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Schedule</span>
              <h4 style={{ color: '#fff', margin: '0.25rem 0 0.5rem 0', fontSize: '1rem' }}>{selectedBooking.service}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <CalendarIcon size={14} color="#8b5cf6" />
                <span>{selectedBooking.date} • {selectedBooking.time}</span>
              </div>
            </div>

            <div className="reschedule-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              <div className="form-field">
                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Proposed Date</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="date"
                    className="form-input"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>Proposed Time</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="time"
                    className="form-input"
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '0.75rem 1rem',
              background: 'rgba(139, 92, 246, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.1)',
              display: 'flex',
              gap: '10px',
              alignItems: 'start'
            }}>
              <Clock size={16} color="#8b5cf6" style={{ marginTop: '2px' }} />
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(139, 92, 246, 0.8)', lineHeight: '1.4' }}>
                Confirmation will be sent to your email once the provider approves the new time slot.
              </p>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.5rem 1rem',
            animation: 'fadeIn 0.4s ease-out'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'rgba(34, 197, 94, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              border: '2px solid rgba(34, 197, 94, 0.2)'
            }}>
              <CheckCircle2 size={32} color="#4ade80" />
            </div>
            <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Request Sent!</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', maxWidth: '300px' }}>
              We've notified the service provider. You'll receive an email as soon as they confirm.
            </p>
          </div>
        )}
      </AppAlert>

      {/* Global Action Confirm Alert */}
      <AppAlert
        isOpen={actionModal.open}
        title={
          actionModal.type === 'approve'
            ? 'Confirm Appointment'
            : actionModal.type === 'reject'
              ? 'Reject Appointment'
              : 'Confirm Reschedule'
        }
        message={
          actionModal.type === 'approve'
            ? 'Are you sure you want to confirm this booking?'
            : actionModal.type === 'reject'
              ? 'Are you sure you want to reject this booking? This action cannot be undone.'
              : 'The client has requested a different time. Do you accept the new schedule?'
        }
        confirmText={
          actionModal.type === 'approve'
            ? 'Approve'
            : actionModal.type === 'reject'
              ? 'Reject'
              : 'Accept Reschedule'
        }
        cancelText="Close"
        onConfirm={confirmAction}
        onCancel={() => setActionModal({ ...actionModal, open: false })}
        variant={actionModal.type === 'reject' ? 'danger' : 'info'}
      />
    </div>
  );
};

export default TicketsBookings;
