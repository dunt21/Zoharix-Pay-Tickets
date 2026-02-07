"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = require("../config/stripe");
const Payment_1 = __importDefault(require("../models/Payment"));
const Booking_1 = __importDefault(require("../models/Booking"));
class PaymentService {
    async createPaymentIntent(data) {
        try {
            const { amount, currency = stripe_1.stripeConfig.currency, bookingId, userId, metadata = {} } = data;
            const paymentIntent = await stripe_1.stripe.paymentIntents.create({
                amount: amount * 100,
                currency,
                metadata: {
                    bookingId,
                    userId,
                    ...metadata
                }
            });
            const payment = new Payment_1.default({
                user: userId,
                booking: bookingId,
                amount,
                currency,
                stripePaymentIntentId: paymentIntent.id,
                status: 'pending'
            });
            await payment.save();
            return {
                clientSecret: paymentIntent.client_secret,
                paymentId: payment._id,
                paymentIntentId: paymentIntent.id
            };
        }
        catch (error) {
            console.error('Payment intent creation failed:', error);
            throw new Error('Failed to create payment intent');
        }
    }
    async confirmPayment(paymentIntentId) {
        try {
            const paymentIntent = await stripe_1.stripe.paymentIntents.retrieve(paymentIntentId);
            const payment = await Payment_1.default.findOneAndUpdate({ stripePaymentIntentId: paymentIntentId }, { status: paymentIntent.status }, { new: true });
            if (!payment) {
                throw new Error('Payment record not found');
            }
            if (paymentIntent.status === 'succeeded') {
                await Booking_1.default.findByIdAndUpdate(payment.booking, { status: 'confirmed' });
            }
            return {
                status: paymentIntent.status,
                payment
            };
        }
        catch (error) {
            console.error('Payment confirmation failed:', error);
            throw new Error('Failed to confirm payment');
        }
    }
    async processRefund(data) {
        try {
            const { paymentId, amount, reason = 'requested_by_customer' } = data;
            const payment = await Payment_1.default.findById(paymentId);
            if (!payment) {
                throw new Error('Payment not found');
            }
            if (payment.status !== 'succeeded') {
                throw new Error('Can only refund successful payments');
            }
            const refundParams = {
                payment_intent: payment.stripePaymentIntentId,
                reason: reason
            };
            if (amount) {
                refundParams.amount = amount * 100;
            }
            const refund = await stripe_1.stripe.refunds.create(refundParams);
            payment.status = 'refunded';
            await payment.save();
            await Booking_1.default.findByIdAndUpdate(payment.booking, { status: 'cancelled' });
            return {
                refundId: refund.id,
                status: refund.status,
                amount: refund.amount / 100
            };
        }
        catch (error) {
            console.error('Refund processing failed:', error);
            throw new Error('Failed to process refund');
        }
    }
    async getPaymentHistory(userId) {
        try {
            const payments = await Payment_1.default.find({ user: userId })
                .populate({
                path: 'booking',
                populate: {
                    path: 'event',
                    select: 'title date'
                }
            })
                .sort({ createdAt: -1 });
            return payments;
        }
        catch (error) {
            console.error('Failed to get payment history:', error);
            throw new Error('Failed to retrieve payment history');
        }
    }
    async getPaymentById(paymentId) {
        try {
            const payment = await Payment_1.default.findById(paymentId)
                .populate({
                path: 'booking',
                populate: {
                    path: 'event',
                    select: 'title date location'
                }
            });
            if (!payment) {
                throw new Error('Payment not found');
            }
            return payment;
        }
        catch (error) {
            console.error('Failed to get payment:', error);
            throw new Error('Failed to retrieve payment');
        }
    }
    async calculatePlatformFee(amount) {
        const percentageFee = amount * 0.05;
        const fixedFee = 0.30;
        return Math.round((percentageFee + fixedFee) * 100) / 100;
    }
    async getPaymentStats(userId) {
        try {
            const matchStage = userId ? { user: userId } : {};
            const stats = await Payment_1.default.aggregate([
                { $match: { ...matchStage, status: 'succeeded' } },
                {
                    $group: {
                        _id: null,
                        totalRevenue: { $sum: '$amount' },
                        totalPayments: { $sum: 1 },
                        averagePayment: { $avg: '$amount' }
                    }
                }
            ]);
            return stats[0] || {
                totalRevenue: 0,
                totalPayments: 0,
                averagePayment: 0
            };
        }
        catch (error) {
            console.error('Failed to get payment stats:', error);
            throw new Error('Failed to retrieve payment statistics');
        }
    }
    async handleWebhook(event) {
        try {
            const { type, data } = event;
            switch (type) {
                case 'payment_intent.succeeded':
                    await this.confirmPayment(data.object.id);
                    break;
                case 'payment_intent.payment_failed':
                    await Payment_1.default.findOneAndUpdate({ stripePaymentIntentId: data.object.id }, { status: 'failed' });
                    break;
                default:
                    console.log(`Unhandled webhook event: ${type}`);
            }
        }
        catch (error) {
            console.error('Webhook handling failed:', error);
            throw new Error('Failed to handle payment webhook');
        }
    }
}
exports.default = PaymentService;
//# sourceMappingURL=PaymentService.js.map