import mongoose, { Document } from 'mongoose';
export interface IBooking extends Document {
    user: mongoose.Types.ObjectId;
    event: mongoose.Types.ObjectId;
    tickets: {
        type: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
    paymentId?: mongoose.Types.ObjectId;
    bookingReference: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IBooking, {}, {}, {}, mongoose.Document<unknown, {}, IBooking, {}, mongoose.DefaultSchemaOptions> & IBooking & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IBooking>;
export default _default;
//# sourceMappingURL=Booking.d.ts.map