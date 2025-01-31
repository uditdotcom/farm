const express = require('express');
const fs = require('fs');
const farmersData = require('./apmc_farmer.json');
const cors = require('cors');

const app = express();
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
const PORT = 5000;

// Add a New Farmer - POST /farmers
app.post('/farmers', (req, res) => {
    const { farmerId, name, contact, farmLocation } = req.body;
  
    if (!name || !contact || !contact.phone || !contact.email) {
      return res.status(400).json({ message: "Name, phone, and email are required." });
    }
  
    const newFarmer = {
      farmerId: Number(farmerId || farmersData.farmers.length + 1),
      name,
      contact,
      farmLocation,
      producedCrops: []
    };
  
    farmersData.farmers.push(newFarmer);
  
    fs.writeFile('./APMC_farmer.json', JSON.stringify(farmersData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to save farmer data." });
      }
      res.status(201).json({ message: "Farmer added successfully.", farmer: newFarmer });
    });
  });

  // List All Farmers and Their Crops - GET /farmers
app.get('/farmers', (req, res) => {
    res.json(farmersData.farmers);
  });
  
  // Retrieve Details of a Specific Farmer - GET /farmers/:farmerId
app.get('/farmers/:farmerId', (req, res) => {
    const farmerId = Number(req.params.farmerId);
    const farmer = farmersData.farmers.find(f => f.farmerId === farmerId);
  
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found." });
    }
  
    res.json(farmer);
  });
  

// Add Crops to a Farmer - POST /farmers/:farmerId/crops
app.post('/farmers/:farmerId/crops', (req, res) => {
    const farmerId = Number(req.params.farmerId); // first find id of farmer
    const farmer = farmersData.farmers.find(f => f.farmerId === farmerId);  // then that match farmer id with respective url farmer id
    if (!farmer) { // here respective farmer id if not match then not found messeage.
      return res.status(404).json({ message: "Farmer not found." });
    }
  
    const { cropId, cropName, category, quantity, unit, pricePerUnit, harvestSeason } = req.body; // here whatever fields data which are be parse from body for that make it in distructuring which is short hand.
  
    if (!cropName || !category || !quantity || !pricePerUnit) { // here feed a validation about some fields are so mandetory.
      return res.status(400).json({ message: "Crop name, category, quantity, and price are required." });
    }
  
    const validCategories = ["Grains", "Vegetables", "Fruits"]; // here give validation for categories 
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: `Invalid category. Must be one of: ${validCategories.join(', ')}.` });
    }
  
    const newCrop = { // here feed type validation to perticuler field by default string type wil be confirmed
      cropId: Number(cropId || farmer.producedCrops.length + 1),
      cropName,
      category,
      quantity: Number(quantity),
      unit,
      pricePerUnit: Number(pricePerUnit),
      harvestSeason
    };
  
    farmer.producedCrops.push(newCrop); // that new crop will be push in farmer  variable's json file in which farmer's producedCrops Array 
  
    fs.writeFile('./APMC_farmer.json', JSON.stringify(farmersData, null, 2), (err) => { //with fs module's asynchronouse writefile() adding data into jaon file
      if (err) {
        return res.status(500).json({ message: "Failed to save crop data." });
      }
      res.status(201).json({ message: "Crop added successfully.", crop: newCrop });
    });
  });


// Remove a Crop from a Farmer - DELETE /farmers/:farmerId/crops/:cropId
app.delete('/farmers/:farmerId/crops/:cropId', (req, res) => {
    const farmerId = Number(req.params.farmerId); // first  define perticuler farmerid
    const cropId = Number(req.params.cropId); // then define perticuler cropid
  
    const farmer = farmersData.farmers.find(f => f.farmerId === farmerId); // find the id perticuler farmerid
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found." });
    }
  
    const cropIndex = farmer.producedCrops.findIndex(c => c.cropId === cropId); // find the id perticuler cropid with their array indexing
    if (cropIndex === -1) {
      return res.status(404).json({ message: "Crop not found." });
    }
  
    farmer.producedCrops.splice(cropIndex, 1); // if perticuler cropid which is match with url cropid then use spice method for complately remove cropid with spece.
  
    fs.writeFile('./APMC_farmer.json', JSON.stringify(farmersData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to delete crop." });
      }
      res.json({ message: "Crop deleted successfully." });
    });
  });

  // Delete a Farmer - DELETE /farmers/:farmerId
app.delete('/farmers/:farmerId', (req, res) => {
    const farmerId = Number(req.params.farmerId);  // find perticuler farmerid from given url perameter
  
    const farmerIndex = farmersData.farmers.findIndex(f => f.farmerId === farmerId); // cheack perticuler farmerid is available or not
    if (farmerIndex === -1) {
      return res.status(404).json({ message: "Farmer not found." });
    }
  
    farmersData.farmers.splice(farmerIndex, 1); 
  // jsondata       json main array (farmers)   with spilce method in that (farmerIndex) which we find.
    fs.writeFile('./APMC_farmer.json', JSON.stringify(farmersData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to delete farmer." });
      }
      res.json({ message: "Farmer deleted successfully." });
    });
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "An unexpected error occurred." });
  });
  

app.listen(PORT,()=> console.log(`Your Server is Listening on PORT ${PORT}`))