import React, { useState } from 'react';
import { FaCreditCard, FaUniversity, FaPlus, FaTrash, FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import Button from '../../../components/Button/Button';
import { useToast } from '../../../context/ToastContext';

interface Card {
    id: string;
    type: 'visa' | 'mastercard' | 'amex';
    last4: string;
    expiry: string;
}

interface BankAccount {
    id: string;
    bankName: string;
    last4: string;
    currency: string;
    isDefault: boolean;
}

const PaymentInfo: React.FC = () => {
    const { success, error } = useToast();
    const [cards, setCards] = useState<Card[]>([
        { id: '1', type: 'visa', last4: '4242', expiry: '12/24' },
        { id: '2', type: 'mastercard', last4: '8888', expiry: '01/26' }
    ]);

    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
        { id: '1', bankName: 'Chase Bank', last4: '6789', currency: 'USD', isDefault: true }
    ]);

    const handleDeleteCard = (id: string) => {
        setCards(cards.filter(card => card.id !== id));
        success('Payment method removed successfully');
    };

    const handleDeleteBank = (id: string) => {
        if (bankAccounts.find(b => b.id === id)?.isDefault) {
            error('Cannot delete default payout account');
            return;
        }
        setBankAccounts(bankAccounts.filter(bank => bank.id !== id));
        success('Bank account removed successfully');
    };

    const handleAddCard = () => {
        // Mock adding a card
        const newCard: Card = {
            id: Math.random().toString(),
            type: 'amex',
            last4: Math.floor(1000 + Math.random() * 9000).toString(),
            expiry: '12/28'
        };
        setCards([...cards, newCard]);
        success('New card added successfully');
    };

    const getCardIcon = (type: string) => {
        switch (type) {
            case 'visa': return <FaCcVisa size={24} color="#fff" />;
            case 'mastercard': return <FaCcMastercard size={24} color="#fff" />;
            case 'amex': return <FaCcAmex size={24} color="#fff" />;
            default: return <FaCreditCard size={24} color="#fff" />;
        }
    };

    const getCardGradient = (type: string) => {
        switch (type) {
            case 'visa': return 'linear-gradient(135deg, #1a1f36 0%, #2b3252 100%)';
            case 'mastercard': return 'linear-gradient(135deg, #303030 0%, #4a4a4a 100%)';
            case 'amex': return 'linear-gradient(135deg, #007bc1 0%, #005b8e 100%)';
            default: return 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)';
        }
    };

    return (
        <div className="settings-section-card">
            <div className="card-header">
                <div>
                    <h3 className="card-title"><FaCreditCard /> Payment Methods</h3>
                    <p className="card-description">Manage your cards and bank accounts for payouts.</p>
                </div>
                <Button variant="secondary" icon={<FaPlus />} onClick={handleAddCard}>Add New</Button>
            </div>

            {/* Saved Cards */}
            <div style={{ marginBottom: '2.5rem' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Saved Cards</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                    {cards.map(card => (
                        <div key={card.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1.25rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            transition: 'transform 0.2s ease',
                        }}
                            className="payment-card-item"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '60px',
                                    height: '40px',
                                    background: getCardGradient(card.type),
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                }}>
                                    {getCardIcon(card.type)}
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: '600', textTransform: 'capitalize' }}>
                                        {card.type} ending in {card.last4}
                                    </p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Expires {card.expiry}</p>
                                </div>
                            </div>
                            <Button variant="ghost" style={{ color: '#EF4444', padding: '0.5rem' }} onClick={() => handleDeleteCard(card.id)}>
                                <FaTrash />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bank Accounts */}
            <div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Payout Accounts</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {bankAccounts.map(bank => (
                        <div key={bank.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1.25rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-primary)',
                                    fontSize: '1.2rem'
                                }}>
                                    <FaUniversity />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{bank.bankName}</p>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>****{bank.last4} • {bank.currency}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {bank.isDefault && (
                                    <span style={{
                                        fontSize: '0.75rem',
                                        padding: '0.25rem 0.75rem',
                                        background: 'rgba(139, 92, 246, 0.1)',
                                        color: '#8B5CF6',
                                        borderRadius: '50px',
                                        fontWeight: '600',
                                        border: '1px solid rgba(139, 92, 246, 0.2)'
                                    }}>Default</span>
                                )}
                                <Button
                                    variant="ghost"
                                    style={{ color: bank.isDefault ? 'var(--text-disabled)' : '#EF4444', padding: '0.5rem' }}
                                    onClick={() => handleDeleteBank(bank.id)}
                                    disabled={bank.isDefault}
                                >
                                    <FaTrash />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentInfo;
