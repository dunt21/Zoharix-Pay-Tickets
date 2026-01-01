"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentHistory = exports.confirmPayment = exports.createPaymentIntent = void 0;
const stripe_1 = require("../config/stripe");
const Payment_1 = __importDefault(require("../models/Payment"));
const Booking_1 = __importDefault(require("../models/Booking"));
const User_1 = __importDefault(require("../models/User"));
const createPaymentIntent = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const { amount, currency = stripe_1.stripeConfig.currency, bookingId } = req.body;
        const paymentIntent = await stripe_1.stripe.paymentIntents.create({
            amount: amount * 100,
            currency,
            metadata: { bookingId, userId }
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
        res.status(200).json({
            message: 'Payment intent created',
            clientSecret: paymentIntent.client_secret,
            paymentId: payment._id
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createPaymentIntent = createPaymentIntent;
const confirmPayment = async (req, res, next) => {
    try {
        const { paymentIntentId } = req.body;
        const paymentIntent = await stripe_1.stripe.paymentIntents.retrieve(paymentIntentId);
        await Payment_1.default.findOneAndUpdate({ stripePaymentIntentId: paymentIntentId }, { status: paymentIntent.status });
        if (paymentIntent.status === 'succeeded') {
            const payment = await Payment_1.default.findOne({ stripePaymentIntentId: paymentIntentId });
            if (payment) {
                await Booking_1.default.findByIdAndUpdate(payment.booking, { status: 'confirmed' });
            }
        }
        res.status(200).json({
            message: 'Payment confirmed',
            status: paymentIntent.status
        });
    }
    catch (error) {
        next(error);
    }
};
exports.confirmPayment = confirmPayment;
const getPaymentHistory = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const user = await User_1.default.findById(userId).select('balance');
        const payments = await Payment_1.default.find({ user: userId })
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
    }
    catch (error) {
        next(error);
    }
};
exports.getPaymentHistory = getPaymentHistory;
//# sourceMappingURL=paymentController.js.map