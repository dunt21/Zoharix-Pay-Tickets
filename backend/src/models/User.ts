import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  role: 'user' | 'organizer' | 'admin';
  profileImage?: string;
  phone?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  location?: string;
  interests?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
   type: String,
   required: true,
   trim: true
 },
 lastName: {
   type: String,
   required: true,
   trim: true
 },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'organizer', 'admin'],
    default: 'user'
  },
  profileImage: {
    type: String
  },
  phone: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model<IUser>('User', userSchema);
