import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Search,
  Bell,
  Plus,
  Ticket,
  Users,
  TrendingUp,
  ArrowUpRight,
  Eye,
  Star,
  Activity,
  Zap,
  CheckSquare,
  MoreHorizontal
} from "lucide-react";
import Button from "../../../components/Button/Button";
import './DashboardHome.css';
import { useNavigate } from "react-router-dom";

// --- Mock Data ---
const RECENT_ACTIVITY = [
  { id: 1, type: 'Booking', title: 'Neon Nights Festival', user: 'Liam Johnson', time: '2 mins ago', status: 'confirmed', amount: '₵150.00' },
  { id: 2, type: 'Service', title: 'Wedding Photography', user: 'Sarah Doe', time: '1 hour ago', status: 'pending', amount: '₵450.00' },
  { id: 3, type: 'Event', title: 'Tech Start System', user: 'New Registration', time: '3 hours ago', status: 'confirmed', amount: '₵50.00' },
  { id: 4, type: 'Booking', title: 'VIP Lounge Access', user: 'James Smith', time: '5 hours ago', status: 'confirmed', amount: '₵200.00' },
  { id: 5, type: 'Payout', title: 'Weekly Payout', user: 'Bank Transfer', time: '1 day ago', status: 'confirmed', amount: '-₵1,200.00' },
];

// Simple SVG Line Chart Component
const MiniTrendChart: React.FC<{ color: string }> = ({ color }) => (
  <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
    <defs>
      <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,35 C10,35 15,20 25,20 C35,20 40,30 50,30 C60,30 65,10 75,10 C85,10 90,25 100,20"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 4px 6px ${color}40)` }}
    />
    <path
      d="M0,35 C10,35 15,20 25,20 C35,20 40,30 50,30 C60,30 65,10 75,10 C85,10 90,25 100,20 L100,50 L0,50 Z"
      fill={`url(#grad-${color})`}
      stroke="none"
      style={{ opacity: 0.5 }}
    />
  </svg>
);

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'bookings' | 'payouts'>('all');
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  // Filter activities
  const filteredActivity = activeTab === 'all'
    ? RECENT_ACTIVITY
    : activeTab === 'bookings'
      ? RECENT_ACTIVITY.filter(i => i.type === 'Booking' || i.type === 'Event')
      : RECENT_ACTIVITY.filter(i => i.type === 'Payout');

  return (
    <div className="dashboard-container">

      {/* --- Header --- */}
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LayoutDashboard size={28} className="brand-icon" style={{ color: 'var(--accent-color)' }} />
            Z-Events Dashboard
          </h1>
          <p className="dashboard-subtitle">
            Welcome back, <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Zoharix Tech</span>. You have 3 pending tasks.
          </p>
        </div>
        <div className="header-actions">
          <div className="date-badge">
            <Calendar size={14} />
            <span>{currentDate}</span>
          </div>
          <Button variant="ghost" style={{ padding: '0.6rem' }}>
            <Search size={20} />
          </Button>
          <Button variant="ghost" style={{ padding: '0.6rem', position: 'relative' }}>
            <Bell size={20} />
            <span className="notification-dot"></span>
          </Button>
        </div>
      </header>

      {/* --- Top Grid: Premium Hero Cards --- */}
      <div className="dashboard-top-grid">

        {/* Main Revenue Card */}
        <div className="feature-card-ui revenue-card">
          <div className="card-top">
            <div className="feature-chip glass-chip">
              <Zap size={14} fill="currentColor" />
              <span>Pro Plan Active</span>
            </div>
            <Button variant="ghost" style={{ color: 'white', padding: '0.25rem' }}><MoreHorizontal size={20} /></Button>
          </div>

          <div className="card-mid">
            <div className="feature-label">Total Revenue</div>
            <div className="feature-main-value">₵12,450.00</div>
            <div className="trend-badge positive">
              <ArrowUpRight size={14} /> +18.5%
            </div>
          </div>

          <div className="card-chart">
            <MiniTrendChart color="#ffffff" />
          </div>
        </div>

        {/* Quick Stats Grid (New) */}
        <div className="stats-mini-grid">
          <div className="stat-tile">
            <div className="stat-icon-box purple"><Eye size={20} /></div>
            <div className="stat-info">
              <span className="stat-num">1.2k</span>
              <span className="stat-lbl">Profile Views</span>
            </div>
          </div>
          <div className="stat-tile">
            <div className="stat-icon-box blue"><Ticket size={20} /></div>
            <div className="stat-info">
              <span className="stat-num">843</span>
              <span className="stat-lbl">Tickets Sold</span>
            </div>
          </div>
          <div className="stat-tile">
            <div className="stat-icon-box yellow"><Star size={20} /></div>
            <div className="stat-info">
              <span className="stat-num">4.9</span>
              <span className="stat-lbl">Avg Rating</span>
            </div>
          </div>
          <div className="stat-tile">
            <div className="stat-icon-box green"><Users size={20} /></div>
            <div className="stat-info">
              <span className="stat-num">156</span>
              <span className="stat-lbl">New Clients</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Actions Bar --- */}
      <div className="quick-actions-bar">
        <button className="q-action-btn" onClick={() => navigate('/dashboard/services')}>
          <Plus size={18} /> New Event
        </button>
        <button className="q-action-btn secondary" onClick={() => navigate('/dashboard/bookings')}>
          <Ticket size={18} /> Bookings
        </button>
        <button className="q-action-btn secondary" onClick={() => navigate('/dashboard/analytics')}>
          <Activity size={18} /> Analytics
        </button>
        {/* <div style={{ marginLeft: 'auto' }}>
          <Button variant="ghost" style={{ fontSize: '0.9rem' }}>Customize Layout</Button>
        </div> */}
      </div>

      {/* --- Main Content Grid --- */}
      <div className="dashboard-main-grid">

        {/* Left Column: Advanced Activity Feed */}
        <div className="section-card no-padding overflow-hidden">
          <div className="section-header padded">
            <div>
              <h3 className="section-title">
                <Activity size={20} /> Recent Activity
              </h3>
              <p className="section-desc">Real-time updates from your automated system</p>
            </div>
            <div className="tabs-pill">
              <button className={`tab-item ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All</button>
              <button className={`tab-item ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>Bookings</button>
              <button className={`tab-item ${activeTab === 'payouts' ? 'active' : ''}`} onClick={() => setActiveTab('payouts')}>Payouts</button>
            </div>
          </div>

          <div className="activity-scroll-wrapper">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th className="text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivity.length > 0 ? filteredActivity.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="activity-info-cell">
                        <div className={`activity-icon-mini type-${item.type.toLowerCase()}`}>
                          {item.type === 'Booking' ? <Ticket size={14} /> :
                            item.type === 'Service' ? <Users size={14} /> :
                              item.type === 'Payout' ? <TrendingUp size={14} /> :
                                <Activity size={14} />}
                        </div>
                        <span className="activity-main-title">{item.title}</span>
                      </div>
                    </td>
                    <td><span className="activity-user-text">{item.user}</span></td>
                    <td><span className={`status-pill-mini ${item.status}`}>{item.status}</span></td>
                    <td><span className="time-text-cell">{item.time}</span></td>
                    <td className="text-right"><span className="activity-amt-cell">{item.amount}</span></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="empty-table-state">No activity found for this filter.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="view-all-row padded-x">
              <Button variant="ghost" style={{ width: '100%', fontSize: '0.9rem' }}>View Full History</Button>
            </div>
          </div>
        </div>

        {/* Right Column: Insights & Reminders */}
        <div className="sidebar-flex">

          {/* AI Insight Card */}
          <div className="ai-insight-card">
            <div className="ai-header">
              <div className="ai-badge">AI Insights</div>
              <ArrowUpRight size={16} />
            </div>
            <p className="ai-text">
              Your interactions peak on <strong>Fridays at 6PM</strong>. Consider scheduling new event announcements then for maximum reach.
            </p>
            <div className="ai-actions">
              <button>Schedule Post</button>
              <button className="dismiss">Dismiss</button>
            </div>
          </div>

          {/* Reminders List */}
          <div className="section-card simplified">
            <div className="section-header small-mb">
              <h3 className="section-title">
                <CheckSquare size={20} /> Upcoming Tasks
              </h3>
              <div className="badge-count">3</div>
            </div>
            <div className="task-list">
              <div className="task-item urgent">
                <div className="check-ring"><div className="dot"></div></div>
                <div className="task-content">
                  <span className="task-title">Complete Profile</span>
                  <span className="task-meta">Add bank details</span>
                </div>
                <span className="task-tag">Urgent</span>
              </div>
              <div className="task-item">
                <div className="check-ring"></div>
                <div className="task-content">
                  <span className="task-title">Review Ticket Sales</span>
                  <span className="task-meta">Neon Nights Event</span>
                </div>
              </div>
            </div>
            <Button variant="outline" style={{ width: '100%', marginTop: '1rem' }}>View All</Button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
