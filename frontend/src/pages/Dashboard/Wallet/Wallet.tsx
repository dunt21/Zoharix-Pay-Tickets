import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    TrendingUp,
    Eye,
    EyeOff,
    ChevronDown,
    FileText,
    FileSpreadsheet,
    File
} from 'lucide-react';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Select from '../../../components/Select/Select';
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
    expiry?: string;
    cvv?: string;
    countryCode?: string;
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
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [balance, setBalance] = useState(1245.50);
    const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(SAMPLE_PAYMENT_METHODS);
    const [isBalanceHidden, setIsBalanceHidden] = useState(false);
    const [cardBrand, setCardBrand] = useState('VISA');
    const [cardLast4, setCardLast4] = useState('8829');
    const [cardExpiry, setCardExpiry] = useState('12/25');

    // Add Method State
    const [isAdding, setIsAdding] = useState(false);
    const [newType, setNewType] = useState<'Card' | 'MoMo'>('Card');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+233');
    const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

    // Top Up & Withdraw State
    const [showTopUpModal, setShowTopUpModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [topUpAmount, setTopUpAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsExportDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleDeleteMethod = (id: string) => {
        setPaymentMethods(prev => prev.filter(pm => pm.id !== id));
    };

    const detectCardType = (number: string) => {
        const num = number.replace(/\s/g, '');
        if (num.startsWith('4')) return 'Visa';
        if (num.startsWith('5') || num.startsWith('2')) return 'Mastercard';
        if (num.startsWith('3')) return 'Amex';
        return 'Card';
    };

    const handleAddPaymentMethod = () => {
        if (newType === 'Card') {
            if (!cardNumber || !expiryDate || !cvv) {
                alert('Please fill in all card details');
                return;
            }
            const last4 = cardNumber.slice(-4);
            const provider = detectCardType(cardNumber);
            const newMethod: PaymentMethod = {
                id: Math.random().toString(),
                kind: 'Card',
                label: `${provider} ending in ${last4}`,
                last4,
                provider,
                expiry: expiryDate,
                cvv
            };
            setPaymentMethods(prev => [...prev, newMethod]);

            // Update the visa card display with the new card info
            setCardBrand(provider.toUpperCase());
            setCardLast4(last4);
            setCardExpiry(expiryDate);

            setCardNumber('');
            setExpiryDate('');
            setCvv('');
        } else {
            if (!phoneNumber || !countryCode) {
                alert('Please fill in phone number and country code');
                return;
            }
            const newMethod: PaymentMethod = {
                id: Math.random().toString(),
                kind: 'MoMo',
                label: `${countryCode} ${phoneNumber}`,
                provider: 'MTN',
                countryCode
            };
            setPaymentMethods(prev => [...prev, newMethod]);
            setPhoneNumber('');
        }
        setIsAdding(false);
    };

    const handleTopUp = () => {
        setShowTopUpModal(true);
    };

    const handleWithdraw = () => {
        setShowWithdrawModal(true);
    };

    const processTopUp = () => {
        const amount = parseFloat(topUpAmount);
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        if (!selectedPaymentMethod) {
            alert('Please select a payment method');
            return;
        }

        const method = paymentMethods.find(pm => pm.id === selectedPaymentMethod);
        if (!method) return;

        // Add transaction
        const newTransaction: Transaction = {
            id: `t${Date.now()}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            description: 'Wallet Top Up',
            amount: amount,
            type: 'credit',
            method: method.kind,
            status: 'completed'
        };

        setTransactions(prev => [newTransaction, ...prev]);
        setBalance(prev => prev + amount);
        setTopUpAmount('');
        setSelectedPaymentMethod('');
        setShowTopUpModal(false);
        alert(`Successfully added ₵${amount.toFixed(2)} to your wallet!`);
    };

    const processWithdraw = () => {
        const amount = parseFloat(withdrawAmount);
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        if (amount > balance) {
            alert('Insufficient balance');
            return;
        }
        if (!selectedPaymentMethod) {
            alert('Please select a payment method');
            return;
        }

        const method = paymentMethods.find(pm => pm.id === selectedPaymentMethod);
        if (!method) return;

        // Add transaction
        const newTransaction: Transaction = {
            id: `t${Date.now()}`,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            description: `Withdrawal to ${method.kind}`,
            amount: -amount,
            type: 'debit',
            method: method.kind,
            status: 'pending'
        };

        setTransactions(prev => [newTransaction, ...prev]);
        setBalance(prev => prev - amount);
        setWithdrawAmount('');
        setSelectedPaymentMethod('');
        setShowWithdrawModal(false);
        alert(`Withdrawal of ₵${amount.toFixed(2)} initiated. Processing time: 1-3 business days.`);
    };

    const handleManageCards = () => {
        navigate('/dashboard/settings');
    };

    const handleViewAllTransactions = () => {
        // Navigate to a dedicated transactions page or show a modal with all transactions
        navigate('/dashboard/transactions');
    };

    const handleExportStatement = (format: string) => {
        const dateStr = new Date().toISOString().split('T')[0];

        if (format === 'csv') {
            // Create CSV content
            const headers = ['Date', 'Description', 'Method', 'Amount', 'Status'];
            const csvContent = [
                headers.join(','),
                ...transactions.map(t => [
                    t.date,
                    `"${t.description}"`,
                    t.method,
                    `${t.type === 'credit' ? '+' : '-'}₵${Math.abs(t.amount).toFixed(2)}`,
                    t.status
                ].join(','))
            ].join('\n');

            // Create and download file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `transaction-history-${dateStr}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else if (format === 'excel') {
            // Create Excel-compatible HTML content
            const excelContent = `
                <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
                <head>
                    <meta charset="utf-8">
                    <style>
                        table { border-collapse: collapse; width: 100%; }
                        th { background-color: #4CAF50; color: white; padding: 12px; text-align: left; font-weight: bold; }
                        td { padding: 10px; border: 1px solid #ddd; }
                        tr:nth-child(even) { background-color: #f2f2f2; }
                        .credit { color: #22c55e; font-weight: bold; }
                        .debit { color: #ef4444; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <h2>Z-Events Transaction History</h2>
                    <p>Generated on: ${new Date().toLocaleDateString()}</p>
                    <p>Account Balance: ₵${balance.toFixed(2)}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${transactions.map(t => `
                                <tr>
                                    <td>${t.date}</td>
                                    <td>${t.description}</td>
                                    <td>${t.method}</td>
                                    <td class="${t.type}">${t.type === 'credit' ? '+' : '-'}₵${Math.abs(t.amount).toFixed(2)}</td>
                                    <td>${t.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
                </html>
            `;

            const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `transaction-history-${dateStr}.xls`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } else if (format === 'pdf') {
            // Create printable HTML content for PDF
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Transaction History - ${dateStr}</title>
                        <style>
                            @media print {
                                body { margin: 0; }
                                .no-print { display: none; }
                            }
                            body {
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                padding: 40px;
                                color: #333;
                            }
                            .header {
                                text-align: center;
                                margin-bottom: 30px;
                                border-bottom: 3px solid #4CAF50;
                                padding-bottom: 20px;
                            }
                            .header h1 {
                                color: #4CAF50;
                                margin: 0;
                                font-size: 28px;
                            }
                            .info {
                                margin: 20px 0;
                                padding: 15px;
                                background: #f5f5f5;
                                border-radius: 8px;
                            }
                            .info p {
                                margin: 5px 0;
                                font-size: 14px;
                            }
                            table {
                                width: 100%;
                                border-collapse: collapse;
                                margin-top: 20px;
                            }
                            th {
                                background-color: #4CAF50;
                                color: white;
                                padding: 12px;
                                text-align: left;
                                font-weight: 600;
                            }
                            td {
                                padding: 10px 12px;
                                border-bottom: 1px solid #ddd;
                            }
                            tr:hover {
                                background-color: #f9f9f9;
                            }
                            .credit {
                                color: #22c55e;
                                font-weight: bold;
                            }
                            .debit {
                                color: #ef4444;
                                font-weight: bold;
                            }
                            .status-completed {
                                color: #22c55e;
                            }
                            .status-pending {
                                color: #f59e0b;
                            }
                            .footer {
                                margin-top: 40px;
                                text-align: center;
                                font-size: 12px;
                                color: #666;
                            }
                            .print-btn {
                                margin: 20px 0;
                                padding: 12px 24px;
                                background: #4CAF50;
                                color: white;
                                border: none;
                                border-radius: 6px;
                                cursor: pointer;
                                font-size: 16px;
                            }
                            .print-btn:hover {
                                background: #45a049;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>Z-Events Transaction History</h1>
                        </div>
                        
                        <div class="info">
                            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
                            <p><strong>Account Balance:</strong> ₵${balance.toFixed(2)}</p>
                            <p><strong>Total Transactions:</strong> ${transactions.length}</p>
                        </div>

                        <button class="print-btn no-print" onclick="window.print()">Print / Save as PDF</button>

                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Method</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${transactions.map(t => `
                                    <tr>
                                        <td>${t.date}</td>
                                        <td>${t.description}</td>
                                        <td>${t.method}</td>
                                        <td class="${t.type}">${t.type === 'credit' ? '+' : '-'}₵${Math.abs(t.amount).toFixed(2)}</td>
                                        <td class="status-${t.status}">${t.status === 'completed' ? '✓ Completed' : '⏳ Pending'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>

                        <div class="footer">
                            <p>This is an official statement from Z-Events</p>
                            <p>© ${new Date().getFullYear()} Z-Events. All rights reserved.</p>
                        </div>
                    </body>
                    </html>
                `);
                printWindow.document.close();
            }
        }
        setIsExportDropdownOpen(false);
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
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                    <Button
                        variant="outline"
                        icon={<Download size={16} />}
                        onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        Export Statement
                        <ChevronDown size={14} />
                    </Button>
                    {isExportDropdownOpen && (
                        <div className="export-dropdown">
                            <button
                                onClick={() => handleExportStatement('pdf')}
                                className="export-dropdown-item"
                            >
                                <FileText size={16} />
                                PDF
                            </button>
                            <button
                                onClick={() => handleExportStatement('excel')}
                                className="export-dropdown-item"
                            >
                                <FileSpreadsheet size={16} />
                                Excel
                            </button>
                            <button
                                onClick={() => handleExportStatement('csv')}
                                className="export-dropdown-item"
                            >
                                <File size={16} />
                                CSV
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Top Grid: Balance & Quick Actions */}
            <div className="balance-card-grid">
                {/* Credit Card Style Balance */}
                <div className="credit-card-ui">
                    <div>
                        <div className="card-chip"></div>
                        <div className="balance-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            Available Balance
                            <button
                                onClick={() => setIsBalanceHidden(!isBalanceHidden)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    opacity: 0.7,
                                    padding: '0.25rem'
                                }}
                            >
                                {isBalanceHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        <div className="balance-amount">
                            {isBalanceHidden ? '₵••••••' : `₵${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                        </div>
                    </div>
                    <div className="card-details-row">
                        <div>
                            <div className="card-holder-name">Z-Events Member</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                {isBalanceHidden ? '**** ****' : `**** ${cardLast4}`}
                            </div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.25rem' }}>
                                {isBalanceHidden ? '••/••' : cardExpiry}
                            </div>
                        </div>
                        <div className="card-brand">{cardBrand}</div>
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
                    <Button variant="primary" style={{ marginTop: 'auto', width: '100%' }} icon={<CreditCard size={16} />} onClick={handleManageCards}>
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
                        <Button variant="ghost" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }} onClick={handleViewAllTransactions}>View All</Button>
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
                                            <span style={{ color: t.type === 'debit' ? '#ef4444' : '#4ade80', fontWeight: 600 }}>
                                                {t.type === 'credit' ? '+' : '-'}₵{Math.abs(t.amount).toFixed(2)}
                                            </span>
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
                                    {newType === 'Card' ? (
                                        <>
                                            <Input
                                                placeholder="Card Number (16 digits)"
                                                value={cardNumber}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                                                    setCardNumber(value);
                                                    if (value.length >= 1) {
                                                        setCardBrand(detectCardType(value).toUpperCase());
                                                    }
                                                }}
                                                maxLength={16}
                                            />
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <Input
                                                    placeholder="MM/YY"
                                                    value={expiryDate}
                                                    onChange={(e) => {
                                                        let value = e.target.value.replace(/\D/g, '');
                                                        if (value.length >= 2) {
                                                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                                        }
                                                        setExpiryDate(value);
                                                    }}
                                                    maxLength={5}
                                                    style={{ flex: 1 }}
                                                />
                                                <Input
                                                    placeholder="CVV"
                                                    value={cvv}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                        setCvv(value);
                                                    }}
                                                    maxLength={4}
                                                    type="password"
                                                    style={{ flex: 1 }}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <div style={{ width: '140px' }}>
                                                    <Select
                                                        value={countryCode}
                                                        onChange={(value) => setCountryCode(value)}
                                                        options={[
                                                            { value: "+93", label: "🇦🇫 +93" },
                                                            { value: "+355", label: "🇦🇱 +355" },
                                                            { value: "+213", label: "🇩🇿 +213" },
                                                            { value: "+376", label: "🇦🇩 +376" },
                                                            { value: "+244", label: "🇦🇴 +244" },
                                                            { value: "+54", label: "🇦🇷 +54" },
                                                            { value: "+374", label: "🇦🇲 +374" },
                                                            { value: "+61", label: "🇦🇺 +61" },
                                                            { value: "+43", label: "🇦🇹 +43" },
                                                            { value: "+994", label: "🇦🇿 +994" },
                                                            { value: "+973", label: "🇧🇭 +973" },
                                                            { value: "+880", label: "🇧 +880" },
                                                            { value: "+375", label: "🇧🇾 +375" },
                                                            { value: "+32", label: "🇧🇪 +32" },
                                                            { value: "+229", label: "🇧🇯 +229" },
                                                            { value: "+975", label: "🇧🇹 +975" },
                                                            { value: "+591", label: "🇧🇴 +591" },
                                                            { value: "+387", label: "🇧🇦 +387" },
                                                            { value: "+267", label: "🇧🇼 +267" },
                                                            { value: "+55", label: "🇧🇷 +55" },
                                                            { value: "+673", label: "🇧🇳 +673" },
                                                            { value: "+359", label: "🇧🇬 +359" },
                                                            { value: "+226", label: "🇧🇫 +226" },
                                                            { value: "+257", label: "🇧🇮 +257" },
                                                            { value: "+855", label: "🇰🇭 +855" },
                                                            { value: "+237", label: "🇨🇲 +237" },
                                                            { value: "+1", label: "🇨🇦 +1" },
                                                            { value: "+238", label: "🇨🇻 +238" },
                                                            { value: "+236", label: "🇨🇫 +236" },
                                                            { value: "+235", label: "🇹🇩 +235" },
                                                            { value: "+56", label: "🇨🇱 +56" },
                                                            { value: "+86", label: "🇨🇳 +86" },
                                                            { value: "+57", label: "🇨🇴 +57" },
                                                            { value: "+269", label: "🇰🇲 +269" },
                                                            { value: "+242", label: "🇨🇬 +242" },
                                                            { value: "+506", label: "🇨🇷 +506" },
                                                            { value: "+385", label: "🇭🇷 +385" },
                                                            { value: "+53", label: "🇨🇺 +53" },
                                                            { value: "+357", label: "🇨🇾 +357" },
                                                            { value: "+420", label: "🇨🇿 +420" },
                                                            { value: "+45", label: "🇩🇰 +45" },
                                                            { value: "+253", label: "🇩🇯 +253" },
                                                            { value: "+593", label: "🇪🇨 +593" },
                                                            { value: "+20", label: "🇪🇬 +20" },
                                                            { value: "+503", label: "🇸🇻 +503" },
                                                            { value: "+240", label: "🇬🇶 +240" },
                                                            { value: "+291", label: "🇪🇷 +291" },
                                                            { value: "+372", label: "🇪🇪 +372" },
                                                            { value: "+251", label: "🇪🇹 +251" },
                                                            { value: "+679", label: "🇫🇯 +679" },
                                                            { value: "+358", label: "🇫🇮 +358" },
                                                            { value: "+33", label: "🇫🇷 +33" },
                                                            { value: "+241", label: "🇬🇦 +241" },
                                                            { value: "+220", label: "🇬🇲 +220" },
                                                            { value: "+995", label: "🇬🇪 +995" },
                                                            { value: "+49", label: "🇩🇪 +49" },
                                                            { value: "+233", label: "🇬🇭 +233" },
                                                            { value: "+30", label: "🇬🇷 +30" },
                                                            { value: "+502", label: "🇬🇹 +502" },
                                                            { value: "+224", label: "🇬🇳 +224" },
                                                            { value: "+245", label: "🇬🇼 +245" },
                                                            { value: "+592", label: "🇬🇾 +592" },
                                                            { value: "+509", label: "🇭🇹 +509" },
                                                            { value: "+504", label: "🇭🇳 +504" },
                                                            { value: "+852", label: "🇭🇰 +852" },
                                                            { value: "+36", label: "🇭🇺 +36" },
                                                            { value: "+354", label: "🇮🇸 +354" },
                                                            { value: "+91", label: "🇮🇳 +91" },
                                                            { value: "+62", label: "🇮🇩 +62" },
                                                            { value: "+98", label: "🇮🇷 +98" },
                                                            { value: "+964", label: "🇮🇶 +964" },
                                                            { value: "+353", label: "🇮🇪 +353" },
                                                            { value: "+972", label: "🇮🇱 +972" },
                                                            { value: "+39", label: "🇮🇹 +39" },
                                                            { value: "+225", label: "🇨🇮 +225" },
                                                            { value: "+81", label: "🇯🇵 +81" },
                                                            { value: "+962", label: "🇯🇴 +962" },
                                                            { value: "+7", label: "🇰🇿 +7" },
                                                            { value: "+254", label: "🇰🇪 +254" },
                                                            { value: "+965", label: "🇰🇼 +965" },
                                                            { value: "+996", label: "🇰🇬 +996" },
                                                            { value: "+856", label: "🇱🇦 +856" },
                                                            { value: "+371", label: "🇱🇻 +371" },
                                                            { value: "+961", label: "🇱🇧 +961" },
                                                            { value: "+266", label: "🇱🇸 +266" },
                                                            { value: "+231", label: "🇱🇷 +231" },
                                                            { value: "+218", label: "🇱🇾 +218" },
                                                            { value: "+370", label: "🇱🇹 +370" },
                                                            { value: "+352", label: "🇱🇺 +352" },
                                                            { value: "+261", label: "🇲🇬 +261" },
                                                            { value: "+265", label: "🇲🇼 +265" },
                                                            { value: "+60", label: "🇲🇾 +60" },
                                                            { value: "+960", label: "🇲🇻 +960" },
                                                            { value: "+223", label: "🇲🇱 +223" },
                                                            { value: "+356", label: "🇲🇹 +356" },
                                                            { value: "+222", label: "🇲🇷 +222" },
                                                            { value: "+230", label: "🇲🇺 +230" },
                                                            { value: "+52", label: "🇲🇽 +52" },
                                                            { value: "+373", label: "🇲🇩 +373" },
                                                            { value: "+377", label: "🇲🇨 +377" },
                                                            { value: "+976", label: "🇲🇳 +976" },
                                                            { value: "+382", label: "🇲🇪 +382" },
                                                            { value: "+212", label: "🇲🇦 +212" },
                                                            { value: "+258", label: "🇲🇿 +258" },
                                                            { value: "+95", label: "🇲🇲 +95" },
                                                            { value: "+264", label: "🇳🇦 +264" },
                                                            { value: "+977", label: "🇳🇵 +977" },
                                                            { value: "+31", label: "🇳🇱 +31" },
                                                            { value: "+64", label: "🇳🇿 +64" },
                                                            { value: "+505", label: "🇳🇮 +505" },
                                                            { value: "+227", label: "🇳🇪 +227" },
                                                            { value: "+234", label: "🇳🇬 +234" },
                                                            { value: "+850", label: "🇰🇵 +850" },
                                                            { value: "+389", label: "🇲🇰 +389" },
                                                            { value: "+47", label: "🇳🇴 +47" },
                                                            { value: "+968", label: "🇴🇲 +968" },
                                                            { value: "+92", label: "🇵🇰 +92" },
                                                            { value: "+970", label: "🇵🇸 +970" },
                                                            { value: "+507", label: "🇵🇦 +507" },
                                                            { value: "+595", label: "🇵🇾 +595" },
                                                            { value: "+51", label: "🇵🇪 +51" },
                                                            { value: "+63", label: "🇵🇭 +63" },
                                                            { value: "+48", label: "🇵🇱 +48" },
                                                            { value: "+351", label: "🇵🇹 +351" },
                                                            { value: "+974", label: "🇶🇦 +974" },
                                                            { value: "+40", label: "🇷🇴 +40" },
                                                            { value: "+7", label: "🇷🇺 +7" },
                                                            { value: "+250", label: "🇷🇼 +250" },
                                                            { value: "+966", label: "🇸🇦 +966" },
                                                            { value: "+221", label: "🇸🇳 +221" },
                                                            { value: "+381", label: "🇷🇸 +381" },
                                                            { value: "+232", label: "🇸🇱 +232" },
                                                            { value: "+65", label: "🇸🇬 +65" },
                                                            { value: "+421", label: "🇸🇰 +421" },
                                                            { value: "+386", label: "🇸🇮 +386" },
                                                            { value: "+252", label: "🇸🇴 +252" },
                                                            { value: "+27", label: "🇿🇦 +27" },
                                                            { value: "+82", label: "🇰🇷 +82" },
                                                            { value: "+211", label: "🇸🇸 +211" },
                                                            { value: "+34", label: "🇪🇸 +34" },
                                                            { value: "+94", label: "🇱🇰 +94" },
                                                            { value: "+249", label: "🇸🇩 +249" },
                                                            { value: "+597", label: "🇸🇷 +597" },
                                                            { value: "+268", label: "🇸🇿 +268" },
                                                            { value: "+46", label: "🇸🇪 +46" },
                                                            { value: "+41", label: "🇨🇭 +41" },
                                                            { value: "+963", label: "🇸🇾 +963" },
                                                            { value: "+886", label: "🇹🇼 +886" },
                                                            { value: "+992", label: "🇹🇯 +992" },
                                                            { value: "+255", label: "🇹🇿 +255" },
                                                            { value: "+66", label: "🇹🇭 +66" },
                                                            { value: "+228", label: "🇹🇬 +228" },
                                                            { value: "+216", label: "🇹🇳 +216" },
                                                            { value: "+90", label: "🇹🇷 +90" },
                                                            { value: "+993", label: "🇹🇲 +993" },
                                                            { value: "+256", label: "🇺🇬 +256" },
                                                            { value: "+380", label: "🇺🇦 +380" },
                                                            { value: "+971", label: "🇦🇪 +971" },
                                                            { value: "+44", label: "🇬🇧 +44" },
                                                            { value: "+1", label: "🇺🇸 +1" },
                                                            { value: "+598", label: "🇺🇾 +598" },
                                                            { value: "+998", label: "🇺🇿 +998" },
                                                            { value: "+58", label: "🇻🇪 +58" },
                                                            { value: "+84", label: "🇻🇳 +84" },
                                                            { value: "+967", label: "🇾🇪 +967" },
                                                            { value: "+260", label: "🇿🇲 +260" },
                                                            { value: "+263", label: "🇿🇼 +263" }
                                                        ]}
                                                        placeholder="Code"
                                                    />
                                                </div>
                                                <Input
                                                    placeholder="Phone Number"
                                                    value={phoneNumber}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, '');
                                                        setPhoneNumber(value);
                                                    }}
                                                    style={{ flex: 1 }}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <Button style={{ width: '100%' }} variant="primary" onClick={handleAddPaymentMethod}>
                                        Link {newType}
                                    </Button>
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

            {/* Top Up Modal */}
            {showTopUpModal && (
                <div className="modal-overlay" onClick={() => setShowTopUpModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                <ArrowDownLeft size={24} style={{ color: '#4ade80' }} />
                                Top Up Wallet
                            </h2>
                            <button onClick={() => setShowTopUpModal(false)} className="modal-close">×</button>
                        </div>
                        <div className="modal-body">
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Add funds to your Z-Events wallet
                            </p>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Amount</label>
                                <Input
                                    type="number"
                                    placeholder="Enter amount (₵)"
                                    value={topUpAmount}
                                    onChange={(e) => setTopUpAmount(e.target.value)}
                                    style={{ fontSize: '1.1rem' }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Payment Method</label>
                                {paymentMethods.length === 0 ? (
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        No payment methods available. Please add one first.
                                    </p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {paymentMethods.map(pm => (
                                            <div
                                                key={pm.id}
                                                onClick={() => setSelectedPaymentMethod(pm.id)}
                                                style={{
                                                    padding: '1rem',
                                                    border: selectedPaymentMethod === pm.id ? '2px solid var(--accent-color)' : '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '12px',
                                                    cursor: 'pointer',
                                                    background: selectedPaymentMethod === pm.id ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
                                                    transition: 'all 0.2s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem'
                                                }}
                                            >
                                                <div style={{
                                                    background: 'rgba(99, 102, 241, 0.2)',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    color: 'var(--accent-color)'
                                                }}>
                                                    {pm.kind === 'Card' ? <CreditCard size={20} /> : <Smartphone size={20} />}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{pm.provider || pm.kind}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{pm.label}</div>
                                                </div>
                                                {selectedPaymentMethod === pm.id && (
                                                    <div style={{ color: 'var(--accent-color)', fontWeight: 600 }}>✓</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <Button variant="outline" onClick={() => setShowTopUpModal(false)} style={{ flex: 1 }}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={processTopUp} style={{ flex: 1 }}>
                                    Add Funds
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Withdraw Modal */}
            {showWithdrawModal && (
                <div className="modal-overlay" onClick={() => setShowWithdrawModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                                <ArrowUpRight size={24} style={{ color: '#f87171' }} />
                                Withdraw Funds
                            </h2>
                            <button onClick={() => setShowWithdrawModal(false)} className="modal-close">×</button>
                        </div>
                        <div className="modal-body">
                            <div style={{
                                background: 'rgba(99, 102, 241, 0.1)',
                                padding: '1rem',
                                borderRadius: '12px',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(99, 102, 241, 0.2)'
                            }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                                    Available Balance: <strong style={{ color: '#4ade80', fontSize: '1.1rem' }}>₵{balance.toFixed(2)}</strong>
                                </p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Amount</label>
                                <Input
                                    type="number"
                                    placeholder="Enter amount (₵)"
                                    value={withdrawAmount}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    style={{ fontSize: '1.1rem' }}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Withdraw To</label>
                                {paymentMethods.length === 0 ? (
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                        No payment methods available. Please add one first.
                                    </p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {paymentMethods.map(pm => (
                                            <div
                                                key={pm.id}
                                                onClick={() => setSelectedPaymentMethod(pm.id)}
                                                style={{
                                                    padding: '1rem',
                                                    border: selectedPaymentMethod === pm.id ? '2px solid var(--accent-color)' : '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '12px',
                                                    cursor: 'pointer',
                                                    background: selectedPaymentMethod === pm.id ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
                                                    transition: 'all 0.2s',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem'
                                                }}
                                            >
                                                <div style={{
                                                    background: 'rgba(99, 102, 241, 0.2)',
                                                    padding: '0.75rem',
                                                    borderRadius: '8px',
                                                    color: 'var(--accent-color)'
                                                }}>
                                                    {pm.kind === 'Card' ? <CreditCard size={20} /> : pm.kind === 'Bank' ? <Landmark size={20} /> : <Smartphone size={20} />}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{pm.provider || pm.kind}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{pm.label}</div>
                                                </div>
                                                {selectedPaymentMethod === pm.id && (
                                                    <div style={{ color: 'var(--accent-color)', fontWeight: 600 }}>✓</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div style={{
                                background: 'rgba(245, 158, 11, 0.1)',
                                padding: '1rem',
                                borderRadius: '12px',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(245, 158, 11, 0.2)'
                            }}>
                                <p style={{ fontSize: '0.8rem', color: '#fbbf24', margin: 0 }}>
                                    ⏱️ Withdrawals typically take 1-3 business days to process
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <Button variant="outline" onClick={() => setShowWithdrawModal(false)} style={{ flex: 1 }}>
                                    Cancel
                                </Button>
                                <Button variant="primary" onClick={processWithdraw} style={{ flex: 1 }}>
                                    Withdraw
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wallet;
