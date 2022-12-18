import mongoose from 'mongoose';

try {
  await mongoose.connect(process.env.URI_MONGO, {
    dbName: 'cs-546-project-db',
  });
  console.log('DB connected successfully');
} catch (error) {
  console.log('Mongodb connection error:' + error);
}
