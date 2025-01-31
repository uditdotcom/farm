// Project Structure:
// /
// ├── models/
// │   └── Farmer.js         # Mongoose schema and model
// ├── routes/
// │   └── farmerRoutes.js   # Express routes
// ├── config/
// │   └── database.js       # MongoDB connection
// ├── package.json
// └── server.js             # Main server file

// 1. First, install dependencies:
// npm install express mongoose dotenv

// 2. Create config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

// 3. Create models/Farmer.js
const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  cropId: {
    type: Number,
    required: true,
    unique: true
  },
  cropName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Grains', 'Vegetables', 'Fruits']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    default: 'kg'
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0
  },
  harvestSeason: {
    type: String,
    trim: true
  }
});

const FarmerSchema = new mongoose.Schema({
  farmerId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: {
        validator: function(v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      }
    }
  },
  farmLocation: {
    type: String,
    trim: true
  },
  producedCrops: [CropSchema]
}, {
  timestamps: true
});

// Pre-save hook to ensure unique farmerId
FarmerSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastFarmer = await this.constructor.findOne({}, {}, { sort: { farmerId: -1 } });
    this.farmerId = lastFarmer ? lastFarmer.farmerId + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Farmer', FarmerSchema);

// 4. Create routes/farmerRoutes.js
const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');

// Add a New Farmer - POST /farmers
router.post('/', async (req, res) => {
  try {
    const { name, contact, farmLocation } = req.body;

    // Validation
    if (!name || !contact || !contact.phone || !contact.email) {
      return res.status(400).json({ message: "Name, phone, and email are required." });
    }

    const newFarmer = new Farmer({
      name,
      contact,
      farmLocation,
      producedCrops: []
    });

    const savedFarmer = await newFarmer.save();
    res.status(201).json({ 
      message: "Farmer added successfully.", 
      farmer: savedFarmer 
    });
  } catch (error) {
    res.status(400).json({ 
      message: "Error adding farmer", 
      error: error.message 
    });
  }
});

// List All Farmers - GET /farmers
router.get('/', async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ 
      message: "Error retrieving farmers", 
      error: error.message 
    });
  }
});

// Retrieve Specific Farmer - GET /farmers/:farmerId
router.get('/:farmerId', async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ farmerId: req.params.farmerId });
    
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found." });
    }
    
    res.json(farmer);
  } catch (error) {
    res.status(500).json({ 
      message: "Error retrieving farmer", 
      error: error.message 
    });
  }
});

// Add Crops to a Farmer - POST /farmers/:farmerId/crops
router.post('/:farmerId/crops', async (req, res) => {
  try {
    const { cropName, category, quantity, unit, pricePerUnit, harvestSeason } = req.body;

    // Validation
    if (!cropName || !category || !quantity || !pricePerUnit) {
      return res.status(400).json({ message: "Crop name, category, quantity, and price are required." });
    }

    const farmer = await Farmer.findOne({ farmerId: req.params.farmerId });
    
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found." });
    }

    const newCrop = {
      cropName,
      category,
      quantity: Number(quantity),
      unit,
      pricePerUnit: Number(pricePerUnit),
      harvestSeason,
      cropId: farmer.producedCrops.length + 1
    };

    farmer.producedCrops.push(newCrop);
    
    const updatedFarmer = await farmer.save();
    
    res.status(201).json({ 
      message: "Crop added successfully.", 
      crop: newCrop 
    });
  } catch (error) {
    res.status(400).json({ 
      message: "Error adding crop", 
      error: error.message 
    });
  }
});

// Remove a Crop from a Farmer - DELETE /farmers/:farmerId/crops/:cropId
router.delete('/:farmerId/crops/:cropId', async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ farmerId: req.params.farmerId });
    
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found." });
    }

    const cropIndex = farmer.producedCrops.findIndex(
      c => c.cropId === Number(req.params.cropId)
    );

    if (cropIndex === -1) {
      return res.status(404).json({ message: "Crop not found." });
    }

    farmer.producedCrops.splice(cropIndex, 1);
    
    await farmer.save();
    
    res.json({ message: "Crop deleted successfully." });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting crop", 
      error: error.message 
    });
  }
});

// Delete a Farmer - DELETE /farmers/:farmerId
router.delete('/:farmerId', async (req, res) => {
  try {
    const farmer = await Farmer.findOneAndDelete({ 
      farmerId: req.params.farmerId 
    });
    
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found." });
    }
    
    res.json({ message: "Farmer deleted successfully." });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting farmer", 
      error: error.message 
    });
  }
});

module.exports = router;

// 5. Create server.js
const express = require('express');
const connectDB = require('./config/database');
const farmerRoutes = require('./routes/farmerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/farmers', farmerRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred." });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 6. Create .env file in the root directory
// MONGODB_URI=mongodb://localhost:27017/apmcFarmers

// 7. Update package.json
// {
//   "name": "apmc-farmers-mongodb",
//   "version": "1.0.0",
//   "scripts": {
//     "start": "node server.js",
//     "dev": "nodemon server.js"
//   },
//   "dependencies": {
//     "dotenv": "^16.3.1",
//     "express": "^4.18.2",
//     "mongoose": "^7.3.1"
//   },
//   "devDependencies": {
//     "nodemon": "^2.0.22"
//   }
// }

// API Testing Instructions:
// 1. Install Postman or Insomnia for API testing
// 2. Ensure MongoDB is running locally
// 3. Start the server with 'npm run dev'
// 4. Test the following endpoints:

// POST /farmers
// - Create a new farmer
// {
//   "name": "John Doe",
//   "contact": {
//     "phone": "1234567890",
//     "email": "john@example.com"
//   },
//   "farmLocation": "California"
// }

// POST /farmers/:farmerId/crops
// - Add crops to a farmer
// {
//   "cropName": "Wheat",
//   "category": "Grains",
//   "quantity": 100,
//   "pricePerUnit": 50,
//   "unit": "kg",
//   "harvestSeason": "Winter"
// }

// Additional Notes:
// - Install dependencies: npm install
// - Set up MongoDB locally or use MongoDB Atlas
// - Create a .env file with MONGODB_URI
// - Use Postman/Insomnia to test API endpoints