import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const LocationModel = mongoose.model('Location', locationSchema);

export default LocationModel;
