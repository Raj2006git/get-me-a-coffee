import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Database connection
const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Payment Model
const PaymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);

// GET - Fetch payments for a user
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    
    const payments = await Payment.find({ username })
      .sort({ createdAt: -1 })
      .limit(10);
    
    return NextResponse.json({ success: true, payments });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST - Create new payment
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    console.log('Received payment data:', body);
    
    const payment = await Payment.create(body);
    
    console.log('Payment created:', payment);
    
    return NextResponse.json({ success: true, payment }, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}