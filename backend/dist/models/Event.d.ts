import mongoose, { Document } from 'mongoose';
export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
    location: string;
    organizer: mongoose.Types.ObjectId;
    category: string;
    imageUrl?: string;
    ticketTypes: {
        name: string;
        price: number;
        quantity: number;
        sold: number;
    }[];
    status: 'draft' | 'published' | 'cancelled' | 'completed';
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IEvent, {}, {}, {}, mongoose.Document<unknown, {}, IEvent, {}, mongoose.DefaultSchemaOptions> & IEvent & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IEvent>;
export default _default;
//# sourceMappingURL=Event.d.ts.map