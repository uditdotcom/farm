const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  cropId: {
    type: Number,
    required: true,
    unique: true, // Ensure cropId is unique
  },
  cropName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Grains', 'Vegetables', 'Fruits'], // Restrict to specific categories
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity must be a positive number'],
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'liters', 'tons'], // Restrict to specific units
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: [0, 'Price per unit must be a positive number'],
  },
  harvestSeason: {
    type: String,
    trim: true,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer', 
    required: true,
  },
});

const Crop = mongoose.model('Crop', CropSchema);
module.exports = Crop;
