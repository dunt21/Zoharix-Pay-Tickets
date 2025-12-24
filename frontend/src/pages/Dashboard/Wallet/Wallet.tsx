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
    const [balance] = useState(1245.50);
    const [transactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS);
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
        alert('Top Up Feature - Coming Soon!');
    };

    const handleWithdraw = () => {
        alert('Withdrawal Feature - Coming Soon!');
    };

    const handleManageCards = () => {
        navigate('/dashboard/settings');
    };

    const handleViewAllTransactions = () => {
        // Navigate to a dedicated transactions page or show a modal with all transactions
        navigate('/dashboard/transactions');
    };

    const handleExportStatement = (format: string) => {
        if (format === 'csv') {
            // Create CSV content
            const headers = ['Date', 'Description', 'Method', 'Amount', 'Status'];
            const csvContent = [
                headers.join(','),
                ...transactions.map(t => [
                    t.date,
                    `"${t.description}"`,
                    t.method,
                    `${t.type === 'credit' ? '+' : '-'}${Math.abs(t.amount)}`,
                    t.status
                ].join(','))
            ].join('\n');

            // Create and download file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `transaction-history-${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert(`Exporting statement as ${format.toUpperCase()} - Backend integration needed for ${format.toUpperCase()} format`);
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
                                                <select
                                                    value={countryCode}
                                                    onChange={(e) => setCountryCode(e.target.value)}
                                                    className="country-code-select"
                                                >
                                                    <option value="+93">🇦🇫 Afghanistan (+93)</option>
                                                    <option value="+355">🇦🇱 Albania (+355)</option>
                                                    <option value="+213">🇩🇿 Algeria (+213)</option>
                                                    <option value="+376">🇦🇩 Andorra (+376)</option>
                                                    <option value="+244">🇦🇴 Angola (+244)</option>
                                                    <option value="+54">🇦🇷 Argentina (+54)</option>
                                                    <option value="+374">🇦🇲 Armenia (+374)</option>
                                                    <option value="+61">🇦🇺 Australia (+61)</option>
                                                    <option value="+43">🇦🇹 Austria (+43)</option>
                                                    <option value="+994">🇦🇿 Azerbaijan (+994)</option>
                                                    <option value="+973">🇧🇭 Bahrain (+973)</option>
                                                    <option value="+880">🇧🇩 Bangladesh (+880)</option>
                                                    <option value="+375">🇧🇾 Belarus (+375)</option>
                                                    <option value="+32">🇧🇪 Belgium (+32)</option>
                                                    <option value="+229">🇧🇯 Benin (+229)</option>
                                                    <option value="+975">🇧🇹 Bhutan (+975)</option>
                                                    <option value="+591">🇧🇴 Bolivia (+591)</option>
                                                    <option value="+387">🇧🇦 Bosnia (+387)</option>
                                                    <option value="+267">🇧🇼 Botswana (+267)</option>
                                                    <option value="+55">🇧🇷 Brazil (+55)</option>
                                                    <option value="+673">🇧🇳 Brunei (+673)</option>
                                                    <option value="+359">🇧🇬 Bulgaria (+359)</option>
                                                    <option value="+226">🇧🇫 Burkina Faso (+226)</option>
                                                    <option value="+257">🇧🇮 Burundi (+257)</option>
                                                    <option value="+855">🇰🇭 Cambodia (+855)</option>
                                                    <option value="+237">🇨🇲 Cameroon (+237)</option>
                                                    <option value="+1">🇨🇦 Canada (+1)</option>
                                                    <option value="+238">🇨🇻 Cape Verde (+238)</option>
                                                    <option value="+236">🇨🇫 Central African Republic (+236)</option>
                                                    <option value="+235">🇹🇩 Chad (+235)</option>
                                                    <option value="+56">🇨🇱 Chile (+56)</option>
                                                    <option value="+86">🇨🇳 China (+86)</option>
                                                    <option value="+57">🇨🇴 Colombia (+57)</option>
                                                    <option value="+269">🇰🇲 Comoros (+269)</option>
                                                    <option value="+242">🇨🇬 Congo (+242)</option>
                                                    <option value="+506">🇨🇷 Costa Rica (+506)</option>
                                                    <option value="+385">🇭🇷 Croatia (+385)</option>
                                                    <option value="+53">🇨🇺 Cuba (+53)</option>
                                                    <option value="+357">🇨🇾 Cyprus (+357)</option>
                                                    <option value="+420">🇨🇿 Czech Republic (+420)</option>
                                                    <option value="+45">🇩🇰 Denmark (+45)</option>
                                                    <option value="+253">🇩🇯 Djibouti (+253)</option>
                                                    <option value="+593">🇪🇨 Ecuador (+593)</option>
                                                    <option value="+20">🇪🇬 Egypt (+20)</option>
                                                    <option value="+503">🇸🇻 El Salvador (+503)</option>
                                                    <option value="+240">🇬🇶 Equatorial Guinea (+240)</option>
                                                    <option value="+291">🇪🇷 Eritrea (+291)</option>
                                                    <option value="+372">🇪🇪 Estonia (+372)</option>
                                                    <option value="+251">🇪🇹 Ethiopia (+251)</option>
                                                    <option value="+679">🇫🇯 Fiji (+679)</option>
                                                    <option value="+358">🇫🇮 Finland (+358)</option>
                                                    <option value="+33">🇫🇷 France (+33)</option>
                                                    <option value="+241">🇬🇦 Gabon (+241)</option>
                                                    <option value="+220">🇬🇲 Gambia (+220)</option>
                                                    <option value="+995">🇬🇪 Georgia (+995)</option>
                                                    <option value="+49">🇩🇪 Germany (+49)</option>
                                                    <option value="+233">🇬🇭 Ghana (+233)</option>
                                                    <option value="+30">🇬🇷 Greece (+30)</option>
                                                    <option value="+502">🇬🇹 Guatemala (+502)</option>
                                                    <option value="+224">🇬🇳 Guinea (+224)</option>
                                                    <option value="+245">🇬🇼 Guinea-Bissau (+245)</option>
                                                    <option value="+592">🇬🇾 Guyana (+592)</option>
                                                    <option value="+509">🇭🇹 Haiti (+509)</option>
                                                    <option value="+504">🇭🇳 Honduras (+504)</option>
                                                    <option value="+852">🇭🇰 Hong Kong (+852)</option>
                                                    <option value="+36">🇭🇺 Hungary (+36)</option>
                                                    <option value="+354">🇮🇸 Iceland (+354)</option>
                                                    <option value="+91">🇮🇳 India (+91)</option>
                                                    <option value="+62">🇮🇩 Indonesia (+62)</option>
                                                    <option value="+98">🇮🇷 Iran (+98)</option>
                                                    <option value="+964">🇮🇶 Iraq (+964)</option>
                                                    <option value="+353">🇮🇪 Ireland (+353)</option>
                                                    <option value="+972">🇮🇱 Israel (+972)</option>
                                                    <option value="+39">🇮🇹 Italy (+39)</option>
                                                    <option value="+225">🇨🇮 Ivory Coast (+225)</option>
                                                    <option value="+81">🇯🇵 Japan (+81)</option>
                                                    <option value="+962">🇯🇴 Jordan (+962)</option>
                                                    <option value="+7">🇰🇿 Kazakhstan (+7)</option>
                                                    <option value="+254">🇰🇪 Kenya (+254)</option>
                                                    <option value="+965">🇰🇼 Kuwait (+965)</option>
                                                    <option value="+996">🇰🇬 Kyrgyzstan (+996)</option>
                                                    <option value="+856">🇱🇦 Laos (+856)</option>
                                                    <option value="+371">🇱🇻 Latvia (+371)</option>
                                                    <option value="+961">🇱🇧 Lebanon (+961)</option>
                                                    <option value="+266">🇱🇸 Lesotho (+266)</option>
                                                    <option value="+231">🇱🇷 Liberia (+231)</option>
                                                    <option value="+218">🇱🇾 Libya (+218)</option>
                                                    <option value="+370">🇱🇹 Lithuania (+370)</option>
                                                    <option value="+352">🇱🇺 Luxembourg (+352)</option>
                                                    <option value="+261">🇲🇬 Madagascar (+261)</option>
                                                    <option value="+265">🇲🇼 Malawi (+265)</option>
                                                    <option value="+60">🇲🇾 Malaysia (+60)</option>
                                                    <option value="+960">🇲🇻 Maldives (+960)</option>
                                                    <option value="+223">🇲🇱 Mali (+223)</option>
                                                    <option value="+356">🇲🇹 Malta (+356)</option>
                                                    <option value="+222">🇲🇷 Mauritania (+222)</option>
                                                    <option value="+230">🇲🇺 Mauritius (+230)</option>
                                                    <option value="+52">🇲🇽 Mexico (+52)</option>
                                                    <option value="+373">🇲🇩 Moldova (+373)</option>
                                                    <option value="+377">🇲🇨 Monaco (+377)</option>
                                                    <option value="+976">🇲🇳 Mongolia (+976)</option>
                                                    <option value="+382">🇲🇪 Montenegro (+382)</option>
                                                    <option value="+212">🇲🇦 Morocco (+212)</option>
                                                    <option value="+258">🇲🇿 Mozambique (+258)</option>
                                                    <option value="+95">🇲🇲 Myanmar (+95)</option>
                                                    <option value="+264">🇳🇦 Namibia (+264)</option>
                                                    <option value="+977">🇳🇵 Nepal (+977)</option>
                                                    <option value="+31">🇳🇱 Netherlands (+31)</option>
                                                    <option value="+64">🇳🇿 New Zealand (+64)</option>
                                                    <option value="+505">🇳🇮 Nicaragua (+505)</option>
                                                    <option value="+227">🇳🇪 Niger (+227)</option>
                                                    <option value="+234">🇳🇬 Nigeria (+234)</option>
                                                    <option value="+850">🇰🇵 North Korea (+850)</option>
                                                    <option value="+389">🇲🇰 North Macedonia (+389)</option>
                                                    <option value="+47">🇳🇴 Norway (+47)</option>
                                                    <option value="+968">🇴🇲 Oman (+968)</option>
                                                    <option value="+92">🇵🇰 Pakistan (+92)</option>
                                                    <option value="+970">🇵🇸 Palestine (+970)</option>
                                                    <option value="+507">🇵🇦 Panama (+507)</option>
                                                    <option value="+595">🇵🇾 Paraguay (+595)</option>
                                                    <option value="+51">🇵🇪 Peru (+51)</option>
                                                    <option value="+63">🇵🇭 Philippines (+63)</option>
                                                    <option value="+48">🇵🇱 Poland (+48)</option>
                                                    <option value="+351">🇵🇹 Portugal (+351)</option>
                                                    <option value="+974">🇶🇦 Qatar (+974)</option>
                                                    <option value="+40">🇷🇴 Romania (+40)</option>
                                                    <option value="+7">🇷🇺 Russia (+7)</option>
                                                    <option value="+250">🇷🇼 Rwanda (+250)</option>
                                                    <option value="+966">🇸🇦 Saudi Arabia (+966)</option>
                                                    <option value="+221">🇸🇳 Senegal (+221)</option>
                                                    <option value="+381">🇷🇸 Serbia (+381)</option>
                                                    <option value="+232">🇸🇱 Sierra Leone (+232)</option>
                                                    <option value="+65">🇸🇬 Singapore (+65)</option>
                                                    <option value="+421">🇸🇰 Slovakia (+421)</option>
                                                    <option value="+386">🇸🇮 Slovenia (+386)</option>
                                                    <option value="+252">🇸🇴 Somalia (+252)</option>
                                                    <option value="+27">🇿🇦 South Africa (+27)</option>
                                                    <option value="+82">🇰🇷 South Korea (+82)</option>
                                                    <option value="+211">🇸🇸 South Sudan (+211)</option>
                                                    <option value="+34">🇪🇸 Spain (+34)</option>
                                                    <option value="+94">🇱🇰 Sri Lanka (+94)</option>
                                                    <option value="+249">🇸🇩 Sudan (+249)</option>
                                                    <option value="+597">🇸🇷 Suriname (+597)</option>
                                                    <option value="+268">🇸🇿 Eswatini (+268)</option>
                                                    <option value="+46">🇸🇪 Sweden (+46)</option>
                                                    <option value="+41">🇨🇭 Switzerland (+41)</option>
                                                    <option value="+963">🇸🇾 Syria (+963)</option>
                                                    <option value="+886">🇹🇼 Taiwan (+886)</option>
                                                    <option value="+992">🇹🇯 Tajikistan (+992)</option>
                                                    <option value="+255">🇹🇿 Tanzania (+255)</option>
                                                    <option value="+66">🇹🇭 Thailand (+66)</option>
                                                    <option value="+228">🇹🇬 Togo (+228)</option>
                                                    <option value="+216">🇹🇳 Tunisia (+216)</option>
                                                    <option value="+90">🇹🇷 Turkey (+90)</option>
                                                    <option value="+993">🇹🇲 Turkmenistan (+993)</option>
                                                    <option value="+256">🇺🇬 Uganda (+256)</option>
                                                    <option value="+380">🇺🇦 Ukraine (+380)</option>
                                                    <option value="+971">🇦🇪 UAE (+971)</option>
                                                    <option value="+44">🇬🇧 United Kingdom (+44)</option>
                                                    <option value="+1">🇺🇸 United States (+1)</option>
                                                    <option value="+598">🇺🇾 Uruguay (+598)</option>
                                                    <option value="+998">🇺🇿 Uzbekistan (+998)</option>
                                                    <option value="+58">🇻🇪 Venezuela (+58)</option>
                                                    <option value="+84">🇻🇳 Vietnam (+84)</option>
                                                    <option value="+967">🇾🇪 Yemen (+967)</option>
                                                    <option value="+260">🇿🇲 Zambia (+260)</option>
                                                    <option value="+263">🇿🇼 Zimbabwe (+263)</option>
                                                </select>
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
        </div>
    );
};

export default Wallet;
