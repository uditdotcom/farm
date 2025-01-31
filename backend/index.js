const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Farmer = require('./models/Farmer'); // Farmer model
const Crop = require('./models/Crop');     // Crop model

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect('mongodb://127.0.0.1:27017/Farm_Manegment', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// ROUTES

// 1. Add a New Farmer - POST /farmers
app.post('/farmers', async (req, res) => {
    const { name, contact, farmLocation } = req.body;
  
    if (!name || !contact || !contact.phone || !contact.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    try {
      // Find the farmer with the highest farmerId
      const lastFarmer = await Farmer.findOne().sort({ farmerId: -1 }).select('farmerId');
  
      // If there are no farmers, set farmerId to 1
      const farmerId = lastFarmer ? lastFarmer.farmerId + 1 : 1;
  
      const newFarmer = new Farmer({ farmerId, name, contact, farmLocation });
      const savedFarmer = await newFarmer.save();
  
      res.status(201).json({ message: 'Farmer added successfully', farmer: savedFarmer });
    } catch (error) {
      console.error('Error adding farmer:', error);
      res.status(500).json({ error: 'Failed to add farmer' });
    }
  });
  

// 2. List All Farmers - GET /farmers
app.get('/farmers', async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.status(200).json(farmers);
  } catch (error) {
    console.error('Error fetching farmers:', error);
    res.status(500).json({ error: 'Failed to fetch farmers' });
  }
});

// 3. Retrieve Details of a Specific Farmer - GET /farmers/:farmerId
app.get('/farmers/:farmerId', async (req, res) => {
    const farmerId = parseInt(req.params.farmerId); // Ensure farmerId is parsed as a number
  
    try {
      // Query by the custom `farmerId` field
      const farmer = await Farmer.findOne({ farmerId }); 
      if (!farmer) {
        return res.status(404).json({ error: 'Farmer not found' });
      }
      res.status(200).json(farmer);
    } catch (error) {
      console.error('Error fetching farmer:', error);
      res.status(500).json({ error: 'Failed to fetch farmer' });
    }
  });
  

// 4. Delete a Farmer - DELETE /farmers/:farmerId
app.delete('/farmers/:farmerId', async (req, res) => {
    const farmerId = parseInt(req.params.farmerId); // Parse farmerId as an integer
  
    try {
      // Find the farmer using the custom farmerId field
      const farmer = await Farmer.findOne({ farmerId });
      if (!farmer) {
        return res.status(404).json({ error: 'Farmer not found' });
      }
  
      // Delete all crops associated with the farmer
      await Crop.deleteMany({ farmer: farmer._id });
  
      // Delete the farmer
      const deletedFarmer = await Farmer.findOneAndDelete({ farmerId });
      res.status(200).json({ message: 'Farmer deleted successfully', farmer: deletedFarmer });
    } catch (error) {
      console.error('Error deleting farmer:', error);
      res.status(500).json({ error: 'Failed to delete farmer' });
    }
  });
  

// 5. Add a Crop for a Farmer - POST /crops
app.post('/farmers/:id/crops', async (req, res) => {
  const { cropName, category, quantity, unit, pricePerUnit, harvestSeason } = req.body;
  const farmerId = req.params.id;

  if (!cropName || !category || !quantity || !unit || !pricePerUnit) {
      return res.status(400).json({ error: 'Missing required crop fields' });
  }

  try {
      // Find the farmer by farmerId
      const farmer = await Farmer.findOne({ farmerId });
      if (!farmer) {
          return res.status(404).json({ error: 'Farmer not found' });
      }

      // Find the last cropId to generate the next cropId
      const lastCrop = await Crop.findOne().sort({ cropId: -1 }).select('cropId');
      const cropId = lastCrop ? lastCrop.cropId + 1 : (farmerId * 100 + 1); // Crop IDs start at 101, 201, etc.

      // Create a new crop instance
      const newCrop = new Crop({
          cropId,
          cropName,
          category,
          quantity,
          unit,
          pricePerUnit,
          harvestSeason,
          farmer: farmer._id, // Using farmer's farmerId here
      });

      // Save the new crop
      const savedCrop = await newCrop.save();
      res.status(201).json({ message: 'Crop added successfully', crop: savedCrop });
  } catch (error) {
      console.error('Error adding crop:', error);
      res.status(500).json({ error: 'Failed to add crop' });
  }
});

// 6. List All Crops for a Farmer - GET /crops/:farmerId
app.get('/crops/:farmerId', async (req, res) => {
    const farmerId = parseInt(req.params.farmerId); // Parse the farmerId as an integer
    
    try {
      // Find the farmer using the farmerId
      const farmer = await Farmer.findOne({ farmerId });
      if (!farmer) {
        return res.status(404).json({ error: 'Farmer not found' });
      }
    
      // Find crops using the ObjectId reference of the farmer
      const crops = await Crop.find({ farmer: farmer._id });
    
      res.status(200).json(crops);
    } catch (error) {
      console.error('Error fetching crops:', error);
      res.status(500).json({ error: 'Failed to fetch crops' });
    }
  });

// 7. Delete a Crop - DELETE /crops/:cropId
app.delete('/crops/:cropId', async (req, res) => {
    const cropId = parseInt(req.params.cropId); // Ensure cropId is parsed as an integer
  
    try {
      // Query by the custom `cropId` field and delete the matching document
      const deletedCrop = await Crop.findOneAndDelete({ cropId });
      if (!deletedCrop) {
        return res.status(404).json({ error: 'Crop not found' });
      }
  
      res.status(200).json({ message: 'Crop deleted successfully', crop: deletedCrop });
    } catch (error) {
      console.error('Error deleting crop:', error);
      res.status(500).json({ error: 'Failed to delete crop' });
    }
  });
  
// 8. Update a Farmer - PUT /farmers/:farmerId
app.put('/farmers/:farmerId', async (req, res) => {
  const farmerId = parseInt(req.params.farmerId); // Ensure farmerId is parsed as a number
  const { name, contact, farmLocation } = req.body; // Extract the fields that can be updated

  try {
      // Find the farmer to update by farmerId
      const farmer = await Farmer.findOne({ farmerId });
      if (!farmer) {
          return res.status(404).json({ error: 'Farmer not found' });
      }

      // Update the farmer fields
      farmer.name = name || farmer.name;
      farmer.contact = contact || farmer.contact;
      farmer.farmLocation = farmLocation || farmer.farmLocation;

      // Save the updated farmer
      const updatedFarmer = await farmer.save();

      res.status(200).json({ message: 'Farmer updated successfully', farmer: updatedFarmer });
  } catch (error) {
      console.error('Error updating farmer:', error);
      res.status(500).json({ error: 'Failed to update farmer' });
  }
});
// 9. Update a Crop - PUT /crops/:cropId
app.put('/crops/:cropId', async (req, res) => {
  const cropId = parseInt(req.params.cropId); // Ensure cropId is parsed as a number
  const { cropName, category, quantity, unit, pricePerUnit, harvestSeason } = req.body; // Extract the fields that can be updated

  try {
      // Find the crop to update by cropId
      const crop = await Crop.findOne({ cropId });
      if (!crop) {
          return res.status(404).json({ error: 'Crop not found' });
      }

      // Update the crop fields
      crop.cropName = cropName || crop.cropName;
      crop.category = category || crop.category;
      crop.quantity = quantity || crop.quantity;
      crop.unit = unit || crop.unit;
      crop.pricePerUnit = pricePerUnit || crop.pricePerUnit;
      crop.harvestSeason = harvestSeason || crop.harvestSeason;

      // Save the updated crop
      const updatedCrop = await crop.save();

      res.status(200).json({ message: 'Crop updated successfully', crop: updatedCrop });
  } catch (error) {
      console.error('Error updating crop:', error);
      res.status(500).json({ error: 'Failed to update crop' });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong! Please try again later.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
