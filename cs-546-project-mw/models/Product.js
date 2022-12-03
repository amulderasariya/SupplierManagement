import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  subCategory: {
    type: String,
    required: true,
    trim: true,
  },
  suppliers: [
    {
      supplierID: {
        type: String,
        required: true,
        trim: true,
      },
      stock: {
        type: Number,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        trim: true,
      },
      currency: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

export const Product = model('Product', productSchema);
