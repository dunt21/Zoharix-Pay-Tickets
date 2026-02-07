import mongoose, { Document } from 'mongoose';
export interface IPayment extends Document {
    user: mongoose.Types.ObjectId;
    booking?: mongoose.Types.ObjectId;
    type: 'booking' | 'topup' | 'withdrawal';
    amount: number;
    currency: string;
    stripePaymentIntentId: string;
    status: 'pending' | 'succeeded' | 'failed' | 'cancelled' | 'refunded';
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IPayment, {}, {}, {}, mongoose.Document<unknown, {}, IPayment, {}, mongoose.DefaultSchemaOptions> & IPayment & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IPayment>;
export default _default;
//# sourceMappingURL=Payment.d.ts.map