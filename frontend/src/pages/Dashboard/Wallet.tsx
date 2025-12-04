import React, { useState, useRef, useEffect } from 'react';
import Button from '../../components/Button/Button';
import { FaMoneyBillWave, FaCreditCard, FaUniversity, FaHistory, FaMobileAlt, FaRegCreditCard } from 'react-icons/fa';
import { IoWalletOutline } from 'react-icons/io5';
import '../../components/Button/Button.css';
import './Wallet.css';

type Transaction = {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    method: 'MoMo' | 'Card' | 'Bank';
};

type PaymentMethod = {
    id: string;
    kind: 'MoMo' | 'Card' | 'Bank';
    label: string;
    last4?: string;
};

const sampleTransactions: Transaction[] = [
    { id: 't1', date: '2025-11-30', description: 'Ticket sale — Concert A', amount: 120.0, type: 'credit', method: 'Card' },
    { id: 't2', date: '2025-11-29', description: 'Refund — Order #342', amount: -20.0, type: 'debit', method: 'Bank' },
    { id: 't3', date: '2025-11-28', description: 'Ticket sale — Theater B', amount: 45.0, type: 'credit', method: 'MoMo' },
];

const samplePaymentMethods: PaymentMethod[] = [
    { id: 'pm1', kind: 'Card', label: 'Visa **** 4242', last4: '4242' },
    { id: 'pm2', kind: 'Bank', label: 'Bank — Acct ****1234', last4: '1234' },
    { id: 'pm3', kind: 'MoMo', label: 'MoMo — +233 20 000 0000' },
];

const samplePayouts = [
    { id: 'p1', date: '2025-11-25', amount: 100.0, status: 'Completed' },
    { id: 'p2', date: '2025-11-12', amount: 50.0, status: 'Pending' },
];

const Wallet: React.FC = () => {
    const [balance, setBalance] = useState<number>(145.0);
    const [transactions] = useState<Transaction[]>(sampleTransactions);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(samplePaymentMethods);
    const [payouts] = useState(samplePayouts);
    const [withdrawAmount, setWithdrawAmount] = useState<string>('');
    const [selectedMethod, setSelectedMethod] = useState<string>(paymentMethods[0].id);
    const [addingMethod, setAddingMethod] = useState(false);
    const [newKind, setNewKind] = useState<'MoMo' | 'Card' | 'Bank'>('MoMo');
    const [newLabel, setNewLabel] = useState('');
    const [newLast4, setNewLast4] = useState('');

  

    const handleRemovePayment = (id: string) => {
        setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
        if (selectedMethod === id && paymentMethods.length > 1) setSelectedMethod(paymentMethods[0].id);
    };

    const handleRequestPayout = () => {
       
        alert('Payout request submitted (demo)');
    };

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        const amt = parseFloat(withdrawAmount);
        if (isNaN(amt) || amt <= 0) return alert('Enter a valid amount');
        if (amt > balance) return alert('Insufficient balance');
        setBalance(prev => +(prev - amt).toFixed(2));
        setWithdrawAmount('');
        alert(`Withdrawal of $${amt.toFixed(2)} initiated (demo)`);
    };

    const getMethodDetails = (method: 'MoMo' | 'Card' | 'Bank') => {
        switch (method) {
            case 'Card':
                return 'Visa •••• 4242';
            case 'Bank':
                return 'Acct ••••1234';
            case 'MoMo':
                return '+233 20 000 0000';
            default:
                return '';
        }
    };

    const getShortLabel = (pm: PaymentMethod) => {
        if (pm.kind === 'Card') return pm.last4 ? `Visa •••• ${pm.last4}` : 'Card';
        if (pm.kind === 'Bank') return pm.last4 ? `Bank ••••${pm.last4}` : 'Bank';
        if (pm.kind === 'MoMo') return pm.label?.slice(0, 12) + (pm.label && pm.label.length > 12 ? '…' : '');
        return pm.label;
    };

    
    const [withdrawOpen, setWithdrawOpen] = useState(false);
    const [menuUp, setMenuUp] = useState(false);
    const [ignoreToggle, setIgnoreToggle] = useState(false);
    const withdrawRef = useRef<HTMLDivElement | null>(null);

    const handleSelectMethod = (id: string) => {
        setSelectedMethod(id);
        // prevent the opener from immediately toggling the menu back open on some touch devices
        setIgnoreToggle(true);
        setWithdrawOpen(false);
        setTimeout(() => setIgnoreToggle(false), 250);
       
        setTimeout(() => {
            const btn = withdrawRef.current?.querySelector('.custom-select-button') as HTMLButtonElement | null;
            btn?.focus();
        }, 0);
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!withdrawRef.current) return;
            if (!(e.target instanceof Node)) return;
            if (!withdrawRef.current.contains(e.target)) setWithdrawOpen(false);
        }
        if (withdrawOpen) document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [withdrawOpen]);

    
    useEffect(() => {
        function onResize() {
            setWithdrawOpen(false);
        }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const openWithdrawMenu = () => {
        if (!withdrawRef.current) {
            setMenuUp(false);
            setWithdrawOpen(true);
            return;
        }
        const rect = withdrawRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const estimatedMenuHeight = Math.min(300, window.innerHeight - 80);
        const shouldOpenUp = spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow;
        setMenuUp(shouldOpenUp);
        setWithdrawOpen(true);
    };

    return (
        <div className="wallet-root">
            <header className="wallet-header">
                <div className="header-left">
                    <IoWalletOutline className="wallet-icon" />
                    <div>
                        <h1>Wallet</h1>
                        <p className="muted">Manage your earnings, payouts, and payment methods.</p>
                    </div>
                </div>
            </header>

            {/* Stepper: shows ordered steps across the top */}
            <div className="wallet-stepper">
                {/* compute step completion */}
                {(() => {
                    const hasPayment = paymentMethods.length > 0;
                    const hasSelected = !!selectedMethod;
                    const canWithdraw = hasSelected && balance > 0;
                    const hasTransactions = transactions.length > 0;
                    const steps = [
                        { id: 'add', label: 'Add payment method', done: hasPayment },
                        { id: 'select', label: 'Select method', done: hasSelected },
                        { id: 'withdraw', label: 'Withdraw / Payout', done: canWithdraw },
                        { id: 'transactions', label: 'Transactions', done: hasTransactions },
                    ];
                    return (
                        <div className="stepper-inner">
                            {steps.map((s, i) => (
                                <div key={s.id} className={`stepper-step ${s.done ? 'done' : i === 0 || steps[i-1]?.done ? 'active' : 'locked'}`}>
                                    <div className="step-circle">{s.done ? '✓' : i+1}</div>
                                    <div className="step-label">{s.label}</div>
                                    {i < steps.length - 1 && <div className="step-sep" />}
                                </div>
                            ))}
                        </div>
                    );
                })()}
            </div>

            <section className="wallet-grid">
                <div className="card balance-card gradient" id="balance">
                    <div className="card-top">
                        <div className="card-title">
                            <FaMoneyBillWave className="card-title-icon" />
                            <div>
                                <h4>Available Balance</h4>
                                <div className="small-muted">Ready to withdraw</div>
                            </div>
                        </div>
                        <div className="balance-amount">${balance.toFixed(2)}</div>
                    </div>
                    <div className="balance-actions">
                        <Button className="balance-action" icon={<FaRegCreditCard />} onClick={() => alert('Top up flow')} variant="primary">Top up</Button>
                        <Button className="balance-action" icon={<FaUniversity />} onClick={handleRequestPayout} variant="primary">Payout</Button>
                    </div>
                </div>

                <div className="card transactions-card" id="transactions">
                    <div className="card-header">
                        <div className="card-title"><FaHistory className="card-title-icon" /><h4>Recent Transactions</h4></div>
                        <div className="small-muted">Last 30 days</div>
                    </div>
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Method</th>
                                <th className="right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(t => (
                                <tr key={t.id}>
                                    <td>{t.date}</td>
                                    <td>{t.description}</td>
                                    <td className="method-cell">
                                        <div className="method-main">{t.method}</div>
                                        <div className="method-sub">{getMethodDetails(t.method)}</div>
                                    </td>
                                    <td className={`right ${t.type === 'credit' ? 'credit' : 'debit'}`}>${Math.abs(t.amount).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

             

                <div className="card payment-card">
                    <div className="card-header">
                        <div className="card-title"><FaCreditCard className="card-title-icon" /><h4>Payment Methods</h4></div>
                      

                    </div>
                    {addingMethod && (
                        <form className="add-method-form" onSubmit={(e) => {
                            e.preventDefault();
                            const id = `pm_${Date.now()}`;
                            const label = newLabel || (newKind === 'Card' ? `Card •••• ${newLast4 || '0000'}` : newKind === 'Bank' ? `Bank ••••${newLast4 || '0000'}` : 'MoMo');
                            const payload = { id, kind: newKind, label, last4: newLast4 || undefined } as PaymentMethod;
                            setPaymentMethods(prev => [payload, ...prev]);
                            setSelectedMethod(id);
                            setAddingMethod(false);
                            setNewLabel('');
                            setNewLast4('');
                        }}>
                            <label>
                                Type
                                <select value={newKind} onChange={e => setNewKind(e.target.value as any)}>
                                    <option value="MoMo">MoMo</option>
                                    <option value="Card">Card</option>
                                    <option value="Bank">Bank</option>
                                </select>
                            </label>
                            <label>
                                Label
                                <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="e.g. Visa •••• 4242 or +233 20 ..." />
                            </label>
                            {(newKind === 'Card' || newKind === 'Bank') && (
                                <label>
                                    Last 4 digits
                                    <input value={newLast4} onChange={e => setNewLast4(e.target.value.replace(/[^0-9]/g, '').slice(0,4))} placeholder="1234" />
                                </label>
                            )}
                          
                        </form>
                    )}

                    <ul className="payment-list">
                        {paymentMethods.map(pm => {
                            const Icon = pm.kind === 'Card' ? FaRegCreditCard : pm.kind === 'Bank' ? FaUniversity : FaMobileAlt;
                            return (
                            <li key={pm.id} className={`payment-item ${selectedMethod === pm.id ? 'selected' : ''}`}>
                                <div className="pm-left">
                                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                                        <span className="pm-icon"><Icon /></span>
                                        <div>
                                            <div className="pm-kind">{pm.kind}</div>
                                            <div className="pm-label">{pm.label}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pm-actions">
                                    <Button onClick={() => setSelectedMethod(pm.id)} variant={selectedMethod === pm.id ? 'primary' : 'ghost'}>{selectedMethod === pm.id ? 'Selected' : 'Select'}</Button>
                                    <Button className="danger" onClick={() => handleRemovePayment(pm.id)} variant="ghost">Remove</Button>
                                </div>
                            </li>
                        )})}
                    </ul>
                    <div className="payment-actions">
                        <div className="form-actions">
                            <Button variant="primary" className="form-actions" onClick={() => setAddingMethod(v => !v)}>{addingMethod ? 'Cancel' : 'Add method'}</Button>
                        </div>
                    </div>
                </div>

                <div className="card payouts-card">
                    <div className="card-header">
                        <div className="card-title"><FaUniversity className="card-title-icon" /><h4>Payout Requests</h4></div>
                       
                    </div>
                    <ul className="payout-list">
                        {payouts.map((p: any) => (
                            <li key={p.id} className="payout-item">
                                <div className="payout-left">
                                    <div className="payout-date">{p.date}</div>
                                    <div className="small-muted">Request #{p.id}</div>
                                </div>
                                <div className="payout-right">
                                    <div className="payout-amount">${p.amount.toFixed(2)}</div>
                                    <div className={`status badge ${p.status.toLowerCase()}`}>{p.status}</div>
                                    
                                </div>
                                
                            </li>
                            
                        ))}
                    </ul>
                      <div className="form-actions">
                           <Button onClick={handleRequestPayout} className='form-actions'>Request</Button>
                        </div>
                    
                </div>

                <div className="card withdraw-card">
                    <div className="card-header"><h4>Withdrawals</h4></div>
                    <form className="withdraw-form" onSubmit={handleWithdraw}>
                        <label>
                            Amount
                            <input value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} placeholder="0.00" />
                        </label>
                        <label>
                            Method
                            <div className="custom-select" ref={withdrawRef}>
                                <button
                                    type="button"
                                    className="custom-select-button"
                                    aria-haspopup="listbox"
                                    aria-expanded={withdrawOpen}
                                    onClick={() => {
                                        if (ignoreToggle) return;
                                        if (withdrawOpen) setWithdrawOpen(false);
                                        else openWithdrawMenu();
                                    }}
                                >
                                    <span className="btn-text">{getShortLabel(paymentMethods.find(p => p.id === selectedMethod) || paymentMethods[0])}</span>
                                </button>
                                {withdrawOpen && (
                                    <ul className={`custom-select-menu ${menuUp ? 'top' : ''}`} role="listbox">
                                        {paymentMethods.map(pm => (
                                            <li
                                                key={pm.id}
                                                role="option"
                                                aria-selected={selectedMethod === pm.id}
                                                className={`custom-select-item ${selectedMethod === pm.id ? 'selected' : ''}`}
                                                onClick={() => handleSelectMethod(pm.id)}
                                                onTouchStart={() => handleSelectMethod(pm.id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        handleSelectMethod(pm.id);
                                                    }
                                                }}
                                                tabIndex={0}
                                                title={pm.label}
                                            >
                                                {pm.label}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </label>
                        <div className="form-actions">
                            <Button type="submit">Withdraw</Button>
                        </div>
                    </form>
                </div>

            </section>
        </div>
    );
};

export default Wallet;
