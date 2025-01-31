
import React, { createContext, useState, useEffect } from "react";

// Create the context
export const FarmerContext = createContext();

// FarmerProvider Component
export const FarmerProvider = ({ children }) => {
  
//   const [farmers, setFarmers] = useState(() => {
//     const savedFarmers = localStorage.getItem("farmers");
//     return savedFarmers
//       ? JSON.parse(savedFarmers)
//       : [
//           {
//             id: 1,
//             name: "John Doe",
//             contact: "1234567890",
//             location: "Springfield",
//             farmProducts: [],
//           },
//         ]; // Initialize as an array
//   });

const [farmerInfo, setFarmerInfo] = useState({
    farmerId: 'F001',
    name: 'Bhushan Satote',
    contact: '7359556472',
    location: 'Jalgaon',
    age: 28,
    farmProducts: [
        {
            name: 'Wheat',
            category: 'grain',
            quantity: 500,
            pricePerUnit: 20,
            harvestDate: '2024-10-01',
            storageConditions: 'Cool and dry',
            organicCertification: 'Yes',
            pesticideUse: 'None',
            notes: 'First harvest of the season',
        },
        {
            name: 'Apples',
            category: 'fruit',
            quantity: 300,
            pricePerUnit: 15,
            harvestDate: '2024-09-20',
            storageConditions: 'Refrigerated',
            organicCertification: 'No',
            pesticideUse: 'Yes',
            notes: 'Picked from new orchard',
        },
        {
            name: 'BeetRoot',
            category: 'vegetable',
            quantity: 40,
            pricePerUnit: 20,
            harvestDate: '2024-09-20',
            storageConditions: 'Cool',
            organicCertification: 'Yes',
            pesticideUse: 'No',
            notes: 'Best in Nutrients',
        },
        {
            name: 'Tomatoes',
            category: 'vegetable',
            quantity: 200,
            pricePerUnit: 10,
            harvestDate: '2024-08-15',
            storageConditions: 'Room temperature',
            organicCertification: 'Yes',
            pesticideUse: 'Minimal',
            notes: 'Heirloom variety',
        },
        {
            name: 'Corn',
            category: 'grain',
            quantity: 600,
            pricePerUnit: 8,
            harvestDate: '2024-09-10',
            storageConditions: 'Dry',
            organicCertification: 'No',
            pesticideUse: 'Standard',
            notes: 'Sweet corn variety',
        },
        {
            name: 'Strawberries',
            category: 'fruit',
            quantity: 100,
            pricePerUnit: 25,
            harvestDate: '2024-06-01',
            storageConditions: 'Refrigerated',
            organicCertification: 'Yes',
            pesticideUse: 'None',
            notes: 'Early summer harvest',
        },
        {
            name: 'Potatoes',
            category: 'vegetable',
            quantity: 800,
            pricePerUnit: 5,
            harvestDate: '2024-10-15',
            storageConditions: 'Cool and dark',
            organicCertification: 'No',
            pesticideUse: 'Minimal',
            notes: 'Russet variety',
        },
        {
            name: 'Soybeans',
            category: 'legume',
            quantity: 400,
            pricePerUnit: 12,
            harvestDate: '2024-11-01',
            storageConditions: 'Dry',
            organicCertification: 'Yes',
            pesticideUse: 'None',
            notes: 'Non-GMO',
        },
        {
            name: 'Grapes',
            category: 'fruit',
            quantity: 250,
            pricePerUnit: 18,
            harvestDate: '2024-09-05',
            storageConditions: 'Cool',
            organicCertification: 'No',
            pesticideUse: 'Standard',
            notes: 'Wine variety',
        },
        {
            name: 'Carrots',
            category: 'vegetable',
            quantity: 350,
            pricePerUnit: 7,
            harvestDate: '2024-08-20',
            storageConditions: 'Cool and moist',
            organicCertification: 'Yes',
            pesticideUse: 'None',
            notes: 'Rainbow variety',
        },
        {
            name: 'Barley',
            category: 'grain',
            quantity: 450,
            pricePerUnit: 9,
            harvestDate: '2024-07-15',
            storageConditions: 'Dry',
            organicCertification: 'No',
            pesticideUse: 'Minimal',
            notes: 'Brewing quality',
        },
        {
            name: 'Pumpkins',
            category: 'vegetable',
            quantity: 150,
            pricePerUnit: 14,
            harvestDate: '2024-10-20',
            storageConditions: 'Cool and dry',
            organicCertification: 'Yes',
            pesticideUse: 'None',
            notes: 'Halloween variety',
        },
        {
            name: 'Blueberries',
            category: 'fruit',
            quantity: 80,
            pricePerUnit: 30,
            harvestDate: '2024-07-10',
            storageConditions: 'Refrigerated',
            organicCertification: 'Yes',
            pesticideUse: 'None',
            notes: 'Antioxidant-rich',
        },
        {
            name: 'Lettuce',
            category: 'vegetable',
            quantity: 120,
            pricePerUnit: 6,
            harvestDate: '2024-06-15',
            storageConditions: 'Refrigerated',
            organicCertification: 'Yes',
            pesticideUse: 'None',
            notes: 'Mixed greens',
        },
        {
            name: 'Sunflower Seeds',
            category: 'seed',
            quantity: 200,
            pricePerUnit: 11,
            harvestDate: '2024-09-30',
            storageConditions: 'Dry',
            organicCertification: 'No',
            pesticideUse: 'Minimal',
            notes: 'For oil production',
        },
    ],
});
 const addProduct = (product) => {
    setFarmerInfo((prevState) => ({
        ...prevState,
        farmProducts: [...prevState.farmProducts, product], // Add new product
    }));
};

// Function to remove a product
const removeProduct = (productName) => {
    setFarmerInfo((prevState) => ({
        ...prevState,
        farmProducts: prevState.farmProducts.filter((product) => product.name !== productName),
    }));
};
const updateFarmerInfo = (updatedInfo) => {
    // Add validation (e.g., check for non-empty fields)
    if (!updatedInfo.name || !updatedInfo.contact || !updatedInfo.location) {
        alert("Name, contact, and location are required fields!");
        return;
    }

    setFarmerInfo((prevState) => ({
        ...prevState,
        ...updatedInfo, // Update the farmer info with new data
    }));
  };


  return (
    <FarmerContext.Provider value={{ farmerInfo, addProduct, removeProduct, updateFarmerInfo  }}>
            {children}
        </FarmerContext.Provider>
  );
};
