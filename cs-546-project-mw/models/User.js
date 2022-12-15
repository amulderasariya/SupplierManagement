import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['OWNER', 'SUPPLIER'],
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  avatar: {
    type: Buffer, // casted to MongoDB's BSON type: binData
    required: false,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
    throw new Error('Password hash failed');
  }
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  return await bcryptjs.compare(canditatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
