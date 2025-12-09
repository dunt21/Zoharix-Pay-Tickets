import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    email: string;
    password: string;
<<<<<<< HEAD
    firstName: string;
    lastName: string;
=======
    name: string;
>>>>>>> 3dc6c4ccd869f1f4444ba6c90e94369c6a588506
    isVerified: boolean;
    role: 'user' | 'organizer' | 'admin';
    profileImage?: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IUser>;
export default _default;
//# sourceMappingURL=User.d.ts.map