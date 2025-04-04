import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema({
  bedNumber: {
    type: Number,
    required: true
  },
  isOccupied: {
    type: Boolean,
    default: false
  }
});

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true
  },
  totalBeds: {
    type: Number,
    required: true
  },
  beds:[bedSchema]
});

export const Room = mongoose.model('Room', roomSchema);