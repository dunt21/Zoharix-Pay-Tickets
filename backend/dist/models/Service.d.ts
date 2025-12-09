import mongoose, { Document } from 'mongoose';
export interface IService extends Document {
    title: string;
    description: string;
    provider: mongoose.Types.ObjectId;
    category: string;
    duration: number;
    price: number;
    imageUrl?: string;
    status: 'active' | 'inactive';
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IService, {}, {}, {}, mongoose.Document<unknown, {}, IService, {}, mongoose.DefaultSchemaOptions> & IService & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IService>;
export default _default;
//# sourceMappingURL=Service.d.ts.map