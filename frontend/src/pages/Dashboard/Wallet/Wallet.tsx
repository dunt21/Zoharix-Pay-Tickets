import React, { useState } from 'react';
import {
    Wallet as WalletIcon,
    CreditCard,
    ArrowUpRight,
    ArrowDownLeft,
    Plus,
    Landmark,
    Smartphone,
    Download,
    Trash2,
    TrendingUp
} from 'lucide-react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import './Wallet.css';

// --- Types ---
type Transaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    method: 'MoMo' | 'Card' | 'Bank';
    status: 'completed' | 'pending';
};

type PaymentMethod = {
    id: string;
    kind: 'MoMo' | 'Card' | 'Bank';
    label: string;
    last4?: string;
    provider?: string;
};

// --- Mock Data ---
const SAMPLE_TRANSACTIONS: Transaction[] = [
    { id: 't1', date: 'Dec 05, 2025', description: 'Ticket Revenue - Neon Nights', amount: 450.00, type: 'credit', method: 'MoMo', status: 'completed' },
    { id: 't2', date: 'Dec 03, 2025', description: 'Monthly Subscription', amount: -29.99, type: 'debit', method: 'Card', status: 'completed' },
    { id: 't3', date: 'Nov 28, 2025', description: 'Withdrawal to Bank', amount: -150.00, type: 'debit', method: 'Bank', status: 'completed' },
    { id: 't4', date: 'Nov 25, 2025', description: 'Service Booking - Haircut', amount: 80.00, type: 'credit', method: 'Card', status: 'completed' },
    { id: 't5', date: 'Nov 20, 2025', description: 'Event Ticket - Tech Summit', amount: 150.00, type: 'credit', method: 'MoMo', status: 'completed' },
];

const SAMPLE_PAYMENT_METHODS: PaymentMethod[] = [
    { id: 'pm1', kind: 'Card', label: 'Visa ending in 4242', last4: '4242', provider: 'Visa' },
    { id: 'pm2', kind: 'MoMo', label: 'MTN MoMo: 055-123-4567', provider: 'MTN' },
];

const Wallet: React.FC = () => {
    const [balance] = useState(1245.50);
    const [transactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(SAMPLE_PAYMENT_METHODS);

    // Add Method State
    const [isAdding, setIsAdding] = useState(false);
    const [newType, setNewType] = useState<'Card' | 'MoMo'>('Card');

    const handleDeleteMethod = (id: string) => {
        setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    };

    const handleTopUp = () => {
        alert('Top Up Feature - Coming Soon!');
    };

    const handleWithdraw = () => {
        alert('Withdrawal Feature - Coming Soon!');
    };

    return (
        <div className="wallet-container">
            {/* Header */}
            <header className="wallet-header">
                <div>
                    <h1 className="wallet-title">
                        <WalletIcon size={28} style={{ color: 'var(--accent-color)' }} />
                        Wallet & Payouts
                    </h1>
                    <p className="wallet-subtitle">Manage your earnings, payment methods, and transaction history.</p>
                </div>
                <Button variant="outline" icon={<Download size={16} />}>Export Statement</Button>
            </header>

            {/* Top Grid: Balance & Quick Actions */}
            <div className="balance-card-grid">
                {/* Credit Card Style Balance */}
                <div className="credit-card-ui">
                    <div>
                        <div className="card-chip"></div>
                        <div className="balance-label">Available Balance</div>
                        <div className="balance-amount">₵{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                    </div>
                    <div className="card-details-row">
                        <div>
                            <div className="card-holder-name">Z-Events Member</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>**** 8829</div>
                        </div>
                        <div className="card-brand">VISA</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="actions-card">
                    <h3 className="section-title" style={{ marginBottom: '0.5rem' }}>Quick Actions</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                        Manage your funds easily
                    </p>
                    <div className="action-btn-grid">
                        <div className="action-tile" onClick={handleTopUp}>
                            <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '0.75rem', borderRadius: '50%', color: '#4ade80' }}>
                                <ArrowDownLeft size={24} />
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Top Up</span>
                        </div>
                        <div className="action-tile" onClick={handleWithdraw}>
                            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '50%', color: '#f87171' }}>
                                <ArrowUpRight size={24} />
                            </div>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Withdraw</span>
                        </div>
                    </div>
                    <Button variant="primary" style={{ marginTop: 'auto', width: '100%' }} icon={<CreditCard size={16} />}>
                        Manage Cards
                    </Button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="wallet-main-grid">

                {/* Left Column: Transaction History */}
                <div className="section-card">
                    <div className="section-header">
                        <div>
                            <h3 className="section-title">Transaction History</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                Recent activity on your account
                            </p>
                        </div>
                        <Button variant="ghost" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>View All</Button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table className="transactions-table">
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Method</th>
                                    <th style={{ textAlign: 'right' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(t => (
                                    <tr key={t.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className={`t-icon ${t.type}`}>
                                                    {t.type === 'credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                                </div>
                                                <div>
                                                    <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '0.9rem' }}>
                                                        {t.description}
                                                    </div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                                                        {t.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: '0.85rem' }}>{t.date}</td>
                                        <td>
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem' }}>
                                                {t.method === 'Bank' ? <Landmark size={14} /> : t.method === 'Card' ? <CreditCard size={14} /> : <Smartphone size={14} />}
                                                {t.method}
                                            </span>
                                        </td>
                                        <td className={`t-amount ${t.type}`}>
                                            {t.type === 'credit' ? '+' : '-'}₵{Math.abs(t.amount).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: Payment Methods & Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Payment Methods */}
                    <div className="section-card" style={{ marginBottom: 0 }}>
                        <div className="section-header" style={{ marginBottom: '1rem' }}>
                            <h3 className="section-title">Payment Methods</h3>
                            <button
                                onClick={() => setIsAdding(!isAdding)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--accent-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    fontSize: '0.9rem',
                                    fontWeight: 500
                                }}
                            >
                                <Plus size={18} /> Add
                            </button>
                        </div>

                        <div className="payment-methods-list">
                            {paymentMethods.map(pm => (
                                <div key={pm.id} className="payment-method-item">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div className="pm-icon-box">
                                            {pm.kind === 'Card' ? <CreditCard size={20} /> : <Smartphone size={20} />}
                                        </div>
                                        <div>
                                            <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>
                                                {pm.provider || pm.kind}
                                            </div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {pm.label}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteMethod(pm.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            opacity: 0.5,
                                            transition: 'opacity 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {isAdding && (
                            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                                    Add New Method
                                </h4>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <Button
                                        variant={newType === 'Card' ? 'primary' : 'outline'}
                                        onClick={() => setNewType('Card')}
                                        style={{ flex: 1 }}
                                    >
                                        Card
                                    </Button>
                                    <Button
                                        variant={newType === 'MoMo' ? 'primary' : 'outline'}
                                        onClick={() => setNewType('MoMo')}
                                        style={{ flex: 1 }}
                                    >
                                        MoMo
                                    </Button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <Input placeholder={newType === 'Card' ? "Card Number" : "Phone Number"} />
                                    <Button style={{ width: '100%' }} variant="primary">Link {newType}</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Security Info Card */}
                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderRadius: '16px',
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                    }}>
                        <h4 style={{
                            color: '#818cf8',
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.95rem'
                        }}>
                            🔒 Safe & Secure
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                            Your payment details are encrypted with bank-level security. We never store your full card information.
                        </p>
                    </div>

                    {/* Stats Mini Card */}
                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(34, 197, 94, 0.1)',
                        borderRadius: '16px',
                        border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.2)',
                                padding: '0.5rem',
                                borderRadius: '8px',
                                color: '#4ade80'
                            }}>
                                <TrendingUp size={20} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>This Month</div>
                                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#4ade80' }}>+₵680.00</div>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            You're earning more than last month! 📈
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Wallet;
