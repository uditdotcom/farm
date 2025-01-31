const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  cropId: { type: Number, required: true },
  cropName: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Grains", "Vegetables", "Fruits"],
  },
  quantity: { type: Number, required: true },
  unit: { type: String, default: "kg" },
  pricePerUnit: { type: Number, required: true },
  harvestSeason: { type: String },
});

const FarmerSchema = new mongoose.Schema({
  farmerId: { type: Number, required: true },
  name: { type: String, required: true },
  contact: {
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  farmLocation: { type: String },
  producedCrops: [CropSchema],
});

module.exports = mongoose.model("Farmer", FarmerSchema);
