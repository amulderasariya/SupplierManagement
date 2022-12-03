import mongoose from 'mongoose';

try {
  await mongoose.connect(process.env.URI_MONGO);
  console.log('DB connected successfully');
} catch (error) {
  console.log('Mongodb connection error:' + error);
}
