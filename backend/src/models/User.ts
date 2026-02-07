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
  balance: number;
  location?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  interests?: string[];
  createdAt: Date;
  updatedAt: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
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
  },
  balance: {
    type: Number,
    default: 0
  },
  location: {
    type: String,
    trim: true
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  interests: [{
    type: String
  }],
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
}, {
  timestamps: true
});

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model<IUser>('User', userSchema);
