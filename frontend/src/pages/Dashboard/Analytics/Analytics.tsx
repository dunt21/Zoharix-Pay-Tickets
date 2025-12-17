import React, { useState } from 'react';
import {
    BarChart2,
    TrendingUp,
    TrendingDown,
    Users,
    DollarSign,
    Ticket,
    Calendar,
    ArrowUpRight,
    Activity,
    PieChart,
    Download,
    Eye,
    Zap,
    MoreHorizontal,
    Search,
    Bell,
    Globe
} from 'lucide-react';
import Button from '../../../components/Button/Button';
import './Analytics.css';

// --- Mock Visual Components ---
const LineChartVisual = ({ color = "#ec4899" }: { color?: string }) => (
    <svg width="100%" height="80" viewBox="0 0 300 80" preserveAspectRatio="none" style={{ overflow: 'visible' }}>
        <defs>
            <linearGradient id={`grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
        </defs>
        <path
            d="M0,60 C20,60 40,30 60,40 C80,50 100,20 120,25 C140,30 160,10 180,15 C200,20 220,40 240,35 C260,30 280,5 300,20"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 4px 6px ${color}40)` }}
        />
        <path
            d="M0,60 C20,60 40,30 60,40 C80,50 100,20 120,25 C140,30 160,10 180,15 C200,20 220,40 240,35 C260,30 280,5 300,20 L300,80 L0,80 Z"
            fill={`url(#grad-${color.replace('#', '')})`}
            stroke="none"
        />
    </svg>
);

const DonutChartVisual = () => (
    <div className="donut-chart-container">
        <svg viewBox="0 0 36 36" className="circular-chart">
            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="circle-segment segment-1" strokeDasharray="45, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="circle-segment segment-2" strokeDasharray="30, 100" strokeDashoffset="-45" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="circle-segment segment-3" strokeDasharray="25, 100" strokeDashoffset="-75" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
        </svg>
        <div className="donut-center-text">
            <span>Total</span>
            <strong>1.2k</strong>
        </div>
    </div>
);

const RevenueGoalVisual = () => (
    <div className="goal-visual">
        <div className="goal-bar-bg">
            <div className="goal-bar-fill" style={{ width: '75%' }}></div>
        </div>
        <div className="goal-labels">
            <span>Current: ₵124.5k</span>
            <span>Goal: ₵160k</span>
        </div>
    </div>
);

const TicketStackVisual = () => (
    <div className="ticket-stack-container">
        <div className="stack-row">
            <span className="stack-label">Neon Nights</span>
            <div className="stack-bar">
                <div style={{ width: '20%', background: '#60a5fa' }}></div> {/* Early */}
                <div style={{ width: '50%', background: '#a78bfa' }}></div> {/* Regular */}
                <div style={{ width: '30%', background: '#f472b6' }}></div> {/* VIP */}
            </div>
        </div>
        <div className="stack-row">
            <span className="stack-label">Tech Summit</span>
            <div className="stack-bar">
                <div style={{ width: '40%', background: '#60a5fa' }}></div>
                <div style={{ width: '40%', background: '#a78bfa' }}></div>
                <div style={{ width: '20%', background: '#f472b6' }}></div>
            </div>
        </div>
        <div className="stack-legend">
            <span><div className="dot" style={{ background: '#60a5fa' }}></div> Early Bird</span>
            <span><div className="dot" style={{ background: '#a78bfa' }}></div> Regular</span>
            <span><div className="dot" style={{ background: '#f472b6' }}></div> VIP</span>
        </div>
    </div>
);

const PeakTimesVisual = () => (
    <div className="peak-chart">
        {[20, 35, 50, 80, 60, 45, 30, 90, 100, 70, 40, 20].map((h, i) => (
            <div key={i} className="peak-bar" style={{ height: `${h}%` }}></div>
        ))}
    </div>
);

const Analytics: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    // --- Render Views ---

    const renderOverview = () => (
        <>
            {/* Hero Visual: Performance Graph */}
            <div className="feature-card-ui full-width-chart animate-fade-in">
                <div className="card-top">
                    <div className="feature-chip glass-chip green-theme">
                        <TrendingUp size={14} />
                        <span>Growth on Track</span>
                    </div>
                    <div className="main-metric">
                        <span className="label">Net Revenue (This Month)</span>
                        <div className="value">₵24,500.00</div>
                    </div>
                </div>
                <div className="chart-wrapper">
                    <LineChartVisual color="#4ade80" />
                </div>
                <div className="chart-axis">
                    <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
                </div>
            </div>

            <div className="dashboard-main-grid analytics-grid-layout animate-fade-in">
                {/* Left Col */}
                <div className="left-col">
                    <div className="stats-mini-grid">
                        <div className="stat-tile">
                            <div className="stat-icon-box purple"><Users size={20} /></div>
                            <div className="stat-info">
                                <span className="stat-num">892</span>
                                <span className="stat-lbl">Active Users</span>
                            </div>
                        </div>
                        <div className="stat-tile">
                            <div className="stat-icon-box blue"><Eye size={20} /></div>
                            <div className="stat-info">
                                <span className="stat-num">45.2k</span>
                                <span className="stat-lbl">Page Views</span>
                            </div>
                        </div>
                        <div className="stat-tile">
                            <div className="stat-icon-box pink"><Ticket size={20} /></div>
                            <div className="stat-info">
                                <span className="stat-num">1,240</span>
                                <span className="stat-lbl">Tickets Sold</span>
                            </div>
                        </div>
                        <div className="stat-tile">
                            <div className="stat-icon-box yellow"><Zap size={20} /></div>
                            <div className="stat-info">
                                <span className="stat-num">12.5%</span>
                                <span className="stat-lbl">Conv. Rate</span>
                            </div>
                        </div>
                    </div>

                    <div className="section-card padded">
                        <div className="section-header small-mb">
                            <h3 className="section-title">Top Performing Events</h3>
                            <Button variant="ghost" style={{ fontSize: '0.85rem' }}>View All</Button>
                        </div>
                        <div className="top-events-list">
                            <div className="top-event-row">
                                <div className="rank">1</div>
                                <div className="event-info">
                                    <h4>Neon Nights Festival</h4>
                                    <span>Dec 24 • 450 Sold</span>
                                </div>
                                <div className="revenue-pill">₵45,000</div>
                            </div>
                            <div className="top-event-row">
                                <div className="rank">2</div>
                                <div className="event-info">
                                    <h4>Tech Start Summit</h4>
                                    <span>Jan 15 • 120 Sold</span>
                                </div>
                                <div className="revenue-pill">₵12,500</div>
                            </div>
                            <div className="top-event-row">
                                <div className="rank">3</div>
                                <div className="event-info">
                                    <h4>Summer Vibes</h4>
                                    <span>Jun 05 • 85 Sold</span>
                                </div>
                                <div className="revenue-pill">₵8,200</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Col */}
                <div className="right-col sidebar-flex">
                    <div className="section-card simplified center-content">
                        <div className="section-header small-mb" style={{ width: '100%' }}>
                            <h3 className="section-title">Audience</h3>
                            <MoreHorizontal size={18} color="var(--text-secondary)" />
                        </div>
                        <DonutChartVisual />
                        <div className="legend-row">
                            <div className="legend-item"><span className="dot p1"></span> 18-24</div>
                            <div className="legend-item"><span className="dot p2"></span> 25-34</div>
                            <div className="legend-item"><span className="dot p3"></span> 35+</div>
                        </div>
                    </div>

                    <div className="ai-insight-card">
                        <div className="ai-header">
                            <div className="ai-badge">Global Reach</div>
                            <Globe size={16} />
                        </div>
                        <div className="geo-list">
                            <div className="geo-item">
                                <span>Accra, GH</span>
                                <div className="bar-bg"><div className="bar-fill" style={{ width: '85%' }}></div></div>
                                <span>85%</span>
                            </div>
                            <div className="geo-item">
                                <span>Lagos, NG</span>
                                <div className="bar-bg"><div className="bar-fill" style={{ width: '45%', background: '#a78bfa' }}></div></div>
                                <span>45%</span>
                            </div>
                            <div className="geo-item">
                                <span>Kumasi, GH</span>
                                <div className="bar-bg"><div className="bar-fill" style={{ width: '30%', background: '#f472b6' }}></div></div>
                                <span>30%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    const renderAudience = () => (
        <div className="dashboard-main-grid analytics-grid-layout animate-fade-in">
            <div className="left-col">
                <div className="section-card padded">
                    <div className="section-header">
                        <div>
                            <h3 className="section-title">User Growth</h3>
                            <p className="section-desc">New vs Returning Users over time</p>
                        </div>
                        <div className="feature-chip glass-chip blue-theme">
                            <Activity size={12} /> Live
                        </div>
                    </div>
                    <div style={{ margin: '2rem 0' }}>
                        <LineChartVisual color="#3b82f6" />
                    </div>
                    <div className="insight-grid-2">
                        <div className="stat-tile">
                            <div className="stat-info">
                                <span className="stat-lbl">New Users</span>
                                <span className="stat-num" style={{ color: '#60a5fa' }}>+450</span>
                            </div>
                        </div>
                        <div className="stat-tile">
                            <div className="stat-info">
                                <span className="stat-lbl">Retention</span>
                                <span className="stat-num" style={{ color: '#a78bfa' }}>78%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-card padded">
                    <h3 className="section-title small-mb">Top Interests</h3>
                    <div className="bar-list">
                        <div className="bar-item">
                            <div className="bar-label">🎵 Music & Concerts</div>
                            <div className="bar-track"><div className="bar-val" style={{ width: '85%', background: '#f472b6' }}></div></div>
                            <div className="bar-num">85%</div>
                        </div>
                        <div className="bar-item">
                            <div className="bar-label">💻 Tech & Workshops</div>
                            <div className="bar-track"><div className="bar-val" style={{ width: '65%', background: '#60a5fa' }}></div></div>
                            <div className="bar-num">65%</div>
                        </div>
                        <div className="bar-item">
                            <div className="bar-label">🎨 Arts & Culture</div>
                            <div className="bar-track"><div className="bar-val" style={{ width: '40%', background: '#fbbf24' }}></div></div>
                            <div className="bar-num">40%</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-col">
                <div className="section-card simplified center-content">
                    <h3 className="section-title small-mb">Gender Split</h3>
                    <div className="gender-visual">
                        <div className="gender-circle male">
                            <span>45%</span>
                            <small>Male</small>
                        </div>
                        <div className="gender-circle female">
                            <span>55%</span>
                            <small>Female</small>
                        </div>
                    </div>
                </div>

                <div className="ai-insight-card">
                    <div className="ai-header">
                        <div className="ai-badge">Persona Insight</div>
                        <Users size={16} />
                    </div>
                    <p className="ai-text">
                        Your typical user is a <strong>24-year-old student</strong> from Accra interested in <strong>Afrobeats</strong>.
                    </p>
                </div>
            </div>
        </div>
    );

    const renderRevenue = () => (
        <div className="dashboard-main-grid analytics-grid-layout animate-fade-in">
            <div className="left-col">
                <div className="stats-mini-grid">
                    <div className="stat-tile">
                        <div className="stat-icon-box green"><DollarSign size={20} /></div>
                        <div className="stat-info">
                            <span className="stat-num">₵124.5k</span>
                            <span className="stat-lbl">Gross Income</span>
                        </div>
                    </div>
                    <div className="stat-tile">
                        <div className="stat-icon-box yellow"><Zap size={20} /></div>
                        <div className="stat-info">
                            <span className="stat-num">₵240</span>
                            <span className="stat-lbl">Avg. Order Value</span>
                        </div>
                    </div>
                </div>

                <div className="section-card padded">
                    <div className="section-header small-mb">
                        <h3 className="section-title">Revenue Goals</h3>
                        <div className="feature-chip glass-chip green-theme">On Track</div>
                    </div>
                    <RevenueGoalVisual />
                    <p className="section-desc" style={{ marginTop: '1rem' }}>
                        You represent <strong>75%</strong> of your quarterly goal. Keep promoting your premium services to hit 100%.
                    </p>
                </div>

                <div className="section-card padded">
                    <h3 className="section-title small-mb">Recent Transactions</h3>
                    <table className="analytics-table">
                        <thead>
                            <tr>
                                <th>Source</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div className="t-source"><Ticket size={14} /> Neon Nights</div></td>
                                <td>Today, 10:45 AM</td>
                                <td><span className="status-badge success">Paid</span></td>
                                <td align="right">+₵150.00</td>
                            </tr>
                            <tr>
                                <td><div className="t-source service"><Users size={14} /> Photography</div></td>
                                <td>Yesterday</td>
                                <td><span className="status-badge pending">Pending</span></td>
                                <td align="right">+₵450.00</td>
                            </tr>
                            <tr>
                                <td><div className="t-source"><Ticket size={14} /> Tech Summit</div></td>
                                <td>Dec 12</td>
                                <td><span className="status-badge success">Paid</span></td>
                                <td align="right">+₵50.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="right-col">
                <div className="section-card simplified">
                    <h3 className="section-title small-mb">Revenue Sources</h3>
                    <div className="pie-legend-list">
                        <div className="p-item">
                            <div className="p-color" style={{ background: '#4ade80' }}></div>
                            <div className="p-info">
                                <span>Ticket Sales</span>
                                <strong>70%</strong>
                            </div>
                        </div>
                        <div className="p-item">
                            <div className="p-color" style={{ background: '#8b5cf6' }}></div>
                            <div className="p-info">
                                <span>Services</span>
                                <strong>20%</strong>
                            </div>
                        </div>
                        <div className="p-item">
                            <div className="p-color" style={{ background: '#f472b6' }}></div>
                            <div className="p-info">
                                <span>Add-ons</span>
                                <strong>10%</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ai-insight-card">
                    <div className="ai-header">
                        <div className="ai-badge">Payout Schedule</div>
                        <Calendar size={16} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#e0e7ff' }}>Next Payout</span>
                        <strong style={{ fontSize: '1.1rem', color: '#fff' }}>Tomorrow</strong>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                            <span>Amount to be paid</span>
                            <strong>₵24,500.00</strong>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            Includes sales from Dec 10 - Dec 16
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderEvents = () => (
        <div className="dashboard-main-grid analytics-grid-layout animate-fade-in">
            <div className="left-col">
                <div className="section-card padded">
                    <div className="section-header">
                        <div>
                            <h3 className="section-title">Ticket Sales Breakdown</h3>
                            <p className="section-desc">Sales by ticket category across top events</p>
                        </div>
                    </div>
                    <TicketStackVisual />
                </div>

                <div className="section-card padded">
                    <div className="section-header">
                        <div>
                            <h3 className="section-title">Engagement Funnel</h3>
                            <p className="section-desc">Conversion rates from views to purchase</p>
                        </div>
                    </div>

                    <div className="funnel-container">
                        <div className="funnel-step">
                            <div className="funnel-bar" style={{ width: '100%', background: '#60a5fa' }}></div>
                            <div className="funnel-meta">
                                <span>Page Views</span>
                                <strong>45,200</strong>
                            </div>
                        </div>
                        <div className="funnel-step">
                            <div className="funnel-bar" style={{ width: '45%', background: '#a78bfa' }}></div>
                            <div className="funnel-meta">
                                <span>Ticket Selection</span>
                                <strong>20,340</strong> (45%)
                            </div>
                        </div>
                        <div className="funnel-step">
                            <div className="funnel-bar" style={{ width: '12%', background: '#4ade80' }}></div>
                            <div className="funnel-meta">
                                <span>Purchases</span>
                                <strong>5,420</strong> (26%)
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-col">
                <div className="section-card simplified">
                    <h3 className="section-title small-mb">Peak Booking Times</h3>
                    <p className="section-desc" style={{ marginBottom: '1rem' }}>Activity is highest around <strong>7 PM</strong>.</p>
                    <PeakTimesVisual />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        <span>12 AM</span>
                        <span>12 PM</span>
                        <span>11 PM</span>
                    </div>
                </div>

                <div className="section-card padded">
                    <h3 className="section-title small-mb">Matrix</h3>
                    <div className="matrix-grid" style={{ marginTop: 0 }}>
                        <div className="matrix-item highlight">
                            <div className="m-header">Stars 🌟</div>
                            <div className="m-list">
                                <span>High Traffic</span>
                                <span>High Sales</span>
                            </div>
                        </div>
                        <div className="matrix-item">
                            <div className="m-header">Potentials 📈</div>
                            <div className="m-list">
                                <span>High Traffic</span>
                                <span>Low Sales</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container analytics-page">

            {/* --- Header (Consistent with Home) --- */}
            <header className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">
                        <Activity size={28} style={{ color: '#8b5cf6' }} />
                        Analytics
                    </h1>
                    <p className="dashboard-subtitle">
                        Deep dive into your <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Performance</span>.
                    </p>
                </div>
                <div className="header-actions">
                    <div className="date-badge">
                        <Calendar size={14} />
                        <span>{currentDate}</span>
                    </div>
                    <Button variant="ghost" className="icon-btn-ghost"><Search size={20} /></Button>
                    <Button variant="ghost" className="icon-btn-ghost"><Bell size={20} /></Button>
                </div>
            </header>

            {/* --- Toolbar --- */}
            <div className="analytics-toolbar">
                <div className="tabs-pill">
                    {['Overview', 'Audience', 'Revenue', 'Events'].map(tab => (
                        <button
                            key={tab}
                            className={`tab-item ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="toolbar-actions">
                    <Button variant="outline" className="export-btn" icon={<Download size={16} />}>Descargar Report</Button>
                </div>
            </div>

            {/* --- Content Content --- */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'audience' && renderAudience()}
            {activeTab === 'revenue' && renderRevenue()}
            {activeTab === 'events' && renderEvents()}

        </div>
    );
};

export default Analytics;
