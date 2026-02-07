import { stripe, stripeConfig } from '../config/stripe';
import Payment from '../models/Payment';
import Booking from '../models/Booking';

interface PaymentIntentData {
  amount: number;
  currency?: string;
  bookingId: string;
  userId: string;
  metadata?: Record<string, any>;
}

interface RefundData {
  paymentId: string;
  amount?: number;
  reason?: string;
}

class PaymentService {
  async createPaymentIntent(data: PaymentIntentData): Promise<any> {
    try {
      const { amount, currency = stripeConfig.currency, bookingId, userId, metadata = {} } = data;

      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency,
        metadata: {
          bookingId,
          userId,
          ...metadata
        }
      });

      // Save payment record
      const payment = new Payment({
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
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<any> {
    try {
      // Retrieve payment intent from Stripe
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      // Update payment status
      const payment = await Payment.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntentId },
        { status: paymentIntent.status },
        { new: true }
      );

      if (!payment) {
        throw new Error('Payment record not found');
      }

      // Update booking status if payment succeeded
      if (paymentIntent.status === 'succeeded') {
        await Booking.findByIdAndUpdate(payment.booking, { status: 'confirmed' });
      }

      return {
        status: paymentIntent.status,
        payment
      };
    } catch (error) {
      console.error('Payment confirmation failed:', error);
      throw new Error('Failed to confirm payment');
    }
  }

  async processRefund(data: RefundData): Promise<any> {
    try {
      const { paymentId, amount, reason = 'requested_by_customer' } = data;

      const payment = await Payment.findById(paymentId);
      if (!payment) {
        throw new Error('Payment not found');
      }

      if (payment.status !== 'succeeded') {
        throw new Error('Can only refund successful payments');
      }

      // Create refund
      const refundParams: any = {
        payment_intent: payment.stripePaymentIntentId,
        reason: reason as any
      };

      if (amount) {
        refundParams.amount = amount * 100; // Partial refund
      }

      const refund = await stripe.refunds.create(refundParams);

      // Update payment status
      payment.status = 'refunded';
      // Note: refundId field needs to be added to Payment model
      // payment.refundId = refund.id;
      await payment.save();

      // Update booking status
      await Booking.findByIdAndUpdate(payment.booking, { status: 'cancelled' });

      return {
        refundId: refund.id,
        status: refund.status,
        amount: refund.amount / 100
      };
    } catch (error) {
      console.error('Refund processing failed:', error);
      throw new Error('Failed to process refund');
    }
  }

  async getPaymentHistory(userId: string): Promise<any[]> {
    try {
      const payments = await Payment.find({ user: userId })
        .populate({
          path: 'booking',
          populate: {
            path: 'event',
            select: 'title date'
          }
        })
        .sort({ createdAt: -1 });

      return payments;
    } catch (error) {
      console.error('Failed to get payment history:', error);
      throw new Error('Failed to retrieve payment history');
    }
  }

  async getPaymentById(paymentId: string): Promise<any> {
    try {
      const payment = await Payment.findById(paymentId)
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
    } catch (error) {
      console.error('Failed to get payment:', error);
      throw new Error('Failed to retrieve payment');
    }
  }

  async calculatePlatformFee(amount: number): Promise<number> {
    // Platform fee calculation (e.g., 5% + $0.30)
    const percentageFee = amount * 0.05;
    const fixedFee = 0.30;
    return Math.round((percentageFee + fixedFee) * 100) / 100;
  }

  async getPaymentStats(userId?: string): Promise<any> {
    try {
      const matchStage = userId ? { user: userId } : {};

      const stats = await Payment.aggregate([
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
    } catch (error) {
      console.error('Failed to get payment stats:', error);
      throw new Error('Failed to retrieve payment statistics');
    }
  }

  async handleWebhook(event: any): Promise<void> {
    try {
      const { type, data } = event;

      switch (type) {
        case 'payment_intent.succeeded':
          await this.confirmPayment(data.object.id);
          break;
        case 'payment_intent.payment_failed':
          await Payment.findOneAndUpdate(
            { stripePaymentIntentId: data.object.id },
            { status: 'failed' }
          );
          break;
        default:
          console.log(`Unhandled webhook event: ${type}`);
      }
    } catch (error) {
      console.error('Webhook handling failed:', error);
      throw new Error('Failed to handle payment webhook');
    }
  }
}

export default PaymentService;