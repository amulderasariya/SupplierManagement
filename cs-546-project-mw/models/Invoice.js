import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const invoiceSchema = new Schema({
  ownerId: {
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
    required: true,
  },
  gross_amount: {
    type: Number,
    required: true,
  },
  net_amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    trim: true,
  },
  invoiceFileURL: {
    type: String,
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
