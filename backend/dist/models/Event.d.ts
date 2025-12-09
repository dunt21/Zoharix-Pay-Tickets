import mongoose, { Document } from 'mongoose';
export interface IEvent extends Document {
    title: string;
    description: string;
    date: Date;
<<<<<<< HEAD
    location: string;
=======
    location: {
        address: string;
        city: string;
        country: string;
        coordinates?: {
            lat: number;
            lng: number;
        };
    };
>>>>>>> 3dc6c4ccd869f1f4444ba6c90e94369c6a588506
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