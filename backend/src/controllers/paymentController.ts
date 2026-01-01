import { Request, Response, NextFunction } from 'express';
import { stripe, stripeConfig } from '../config/stripe';
import Payment from '../models/Payment';
import Booking from '../models/Booking';
import User from '../models/User';

export const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;
    const { amount, currency = stripeConfig.currency, bookingId } = req.body;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      metadata: { bookingId, userId }
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

    res.status(200).json({
      message: 'Payment intent created',
      clientSecret: paymentIntent.client_secret,
      paymentId: payment._id
    });
  } catch (error) {
    next(error);
  }
};

export const confirmPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { paymentIntentId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Update payment status
    await Payment.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntentId },
      { status: paymentIntent.status }
    );

    // Update booking status if payment succeeded
    if (paymentIntent.status === 'succeeded') {
      const payment = await Payment.findOne({ stripePaymentIntentId: paymentIntentId });
      if (payment) {
        await Booking.findByIdAndUpdate(payment.booking, { status: 'confirmed' });
      }
    }

    res.status(200).json({
      message: 'Payment confirmed',
      status: paymentIntent.status
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id;

    // Get user balance from User model
    const user = await User.findById(userId).select('balance');

    // Get user payments
    const payments = await Payment.find({ user: userId })
      .populate({
        path: 'booking',
        populate: {
          path: 'event',
          select: 'title date'
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Payment history retrieved',
      balance: user?.balance || 0,
      payments
    });
  } catch (error) {
    next(error);
  }
};
