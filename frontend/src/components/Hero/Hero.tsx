import React from 'react';
import { FaPlay, FaShieldAlt, FaBolt, FaHeadset, FaTicketAlt, FaChartLine, FaCreditCard } from 'react-icons/fa';
import Button from '../Button/Button';
import './Hero.css';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            {/* Background Elements */}
            <div className="hero-bg-glow glow-1"></div>
            <div className="hero-bg-glow glow-2"></div>

            <div className="hero-container">
                {/* Left Column: Text Content */}
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="pulse-dot"></span>
                        Launching Soon
                    </div>

                    <h1 className="hero-title">
                        Events Made Simple. <br />
                        <span className="gradient-text">Payments Made Easy.</span>
                    </h1>

                    <p className="hero-subtitle">
                        The all-in-one platform for creators. Sell tickets, accept payments,
                        and manage events with bank-level security and instant payouts.
                    </p>

                    <div className="hero-cta">
                        <Button variant="primary" icon={<FaBolt />}>
                            Start Free Trial
                        </Button>
                        <Button variant="outline" icon={<FaPlay />}>
                            Watch Demo
                        </Button>
                    </div>

                    <div className="hero-trust">
                        <div className="trust-item">
                            <FaShieldAlt /> Bank-level security
                        </div>
                        <div className="trust-item">
                            <FaBolt /> Instant payouts
                        </div>
                        <div className="trust-item">
                            <FaHeadset /> 24/7 support
                        </div>
                    </div>

                    <div className="hero-stats">
                        <div className="stat">
                            <div className="stat-number">10K+</div>
                            <div className="stat-label">Events</div>
                        </div>
                        <div className="stat-separator"></div>
                        <div className="stat">
                            <div className="stat-number">50K+</div>
                            <div className="stat-label">Tickets</div>
                        </div>
                        <div className="stat-separator"></div>
                        <div className="stat">
                            <div className="stat-number">99.9%</div>
                            <div className="stat-label">Uptime</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: 3D Visuals */}
                <div className="hero-visual">
                    <div className="hero-3d-container">
                        {/* Card 1: Digital Tickets (Back) */}
                        <div className="hero-card card-ticket">
                            <div className="card-header">
                                <div className="card-icon"><FaTicketAlt /></div>
                                <span className="card-tag">Ticket</span>
                            </div>
                            <div className="card-body">
                                <div className="ticket-stub">
                                    <div className="ticket-line"></div>
                                    <div className="ticket-qr">▦▦▦</div>
                                </div>
                                <div className="card-meta">
                                    <span>VIP Access</span>
                                    <span className="status-active">Active</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Analytics (Middle) */}
                        <div className="hero-card card-analytics">
                            <div className="card-header">
                                <div className="card-icon"><FaChartLine /></div>
                                <span className="card-tag">Growth</span>
                            </div>
                            <div className="card-body">
                                <div className="chart-area">
                                    <div className="chart-bar" style={{ height: '40%' }}></div>
                                    <div className="chart-bar" style={{ height: '70%' }}></div>
                                    <div className="chart-bar" style={{ height: '50%' }}></div>
                                    <div className="chart-bar" style={{ height: '85%' }}></div>
                                    <div className="chart-bar" style={{ height: '60%' }}></div>
                                </div>
                                <div className="card-meta">
                                    <span>Revenue</span>
                                    <span className="trend-up">+24%</span>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Payments (Front) */}
                        <div className="hero-card card-payment">
                            <div className="card-header">
                                <div className="card-icon"><FaCreditCard /></div>
                                <span className="card-tag">Payment</span>
                            </div>
                            <div className="card-body">
                                <div className="payment-amount">
                                    <span className="currency">GHS</span>
                                    <span className="amount">2,450.00</span>
                                </div>
                                <div className="payment-methods-row">
                                    <span className="method-badge">MoMo</span>
                                    <span className="method-badge">Visa</span>
                                </div>
                                <div className="card-meta">
                                    <span>Balance</span>
                                    <span className="status-success">Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
