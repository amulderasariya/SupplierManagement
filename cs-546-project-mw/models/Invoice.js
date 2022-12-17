import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const invoiceSchema = new Schema({
  ownerID: {
    type: String,
    required: true,
    trim: true,
  },
  supplierID: {
    type: String,
    required: true,
    trim: true,
  },
  invoiceProducts: [
    {
      productID: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  due_date: {
    type: Date,
    required: false,
  },
  gross_amount: {
    type: Number,
    required: true,
  },
  net_amount: {
    type: Number,
    required: false,
  },
  currency: {
    type: String,
    required: true,
    trim: true,
  },
  deliveredDate: {
    type: Date,
  },
  paidAmount: {
    type: Number,
  },
  paymentStatus: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  supplierRating: {
    type: Number,
  },
  supplierReview: {
    type: String,
  },
  ownerRating: {
    type: Number,
  },
  ownerReview: {
    type: String,
  },
});

export const Invoice = model('Invoice', invoiceSchema);
