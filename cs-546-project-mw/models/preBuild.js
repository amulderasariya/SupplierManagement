import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const preBuildSchema = new Schema({
  isSeedRunning: {
    type: Boolean,
    
  },
});

export const PreBuild = model('PreBuild', preBuildSchema);
