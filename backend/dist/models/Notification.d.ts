import mongoose, { Document } from 'mongoose';
export interface INotification extends Document {
    user: mongoose.Types.ObjectId;
    type: 'event_reminder' | 'booking_confirmation' | 'payment_success' | 'marketing' | 'system';
    title: string;
    message: string;
    data?: Record<string, any>;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification, {}, mongoose.DefaultSchemaOptions> & INotification & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, INotification>;
export default _default;
//# sourceMappingURL=Notification.d.ts.map