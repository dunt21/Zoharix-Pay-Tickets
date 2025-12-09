import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  event?: mongoose.Types.ObjectId;
  service?: mongoose.Types.ObjectId;
  type: 'event' | 'service';
  tickets?: {
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

const bookingSchema = new Schema<IBooking>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  type: {
    type: String,
    enum: ['event', 'service'],
    required: true
  },
  tickets: [{
    type: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  },
  bookingReference: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
bookingSchema.index({ user: 1 });
bookingSchema.index({ event: 1 });
bookingSchema.index({ service: 1 });
bookingSchema.index({ type: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ bookingReference: 1 }, { unique: true });

export default mongoose.model<IBooking>('Booking', bookingSchema);