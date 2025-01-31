// import React, { useEffect, useState } from 'react';

// export default function FarmerCropList() {
//   const [farmers, setFarmers] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/farmers")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch farmers data");
//         }
//         return res.json();
//       })
//       .then((data) => setFarmers(data))
//       .catch((err) => {
//         console.error(err);
//         setError("Failed to fetch farmers. Please try again later.");
//       });
//   }, []);

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2>Farmer-Wise Crop List</h2>
//       {farmers.length === 0 ? (
//         <p>No farmers or crops data available.</p>
//       ) : (
//         farmers.map((farmer) => (
//           <div key={farmer.farmerId}>
//             <h3>{farmer.name}</h3>
//             <p>
//               Contact: {farmer.contact?.phone || "N/A"}, {farmer.contact?.email || "N/A"}
//             </p>
//             <h4>Crops:</h4>
//             {farmer.producedCrops && farmer.producedCrops.length > 0 ? (
//               <ul>
//                 {farmer.producedCrops.map((crop) => (
//                   <li key={crop.cropId}>
//                     {crop.cropName} ({crop.category}) - {crop.quantity} {crop.unit} @ ₹ {crop.pricePerUnit}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No crops listed for this farmer.</p>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


// // // *********************************************************************************************************************


import React, { useState, useEffect } from "react";
import { IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const FarmerCropsList = () => {
  const [farmers, setFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);

  // Fetch farmers on initial load
  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch("http://localhost:5000/farmers");
        if (!response.ok) {
          throw new Error("Failed to fetch farmers");
        }
        const data = await response.json();
        setFarmers(data);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };
    fetchFarmers();
  }, []);

  const handleSelectFarmer = async (farmerId) => {
    try {
      const response = await fetch(`http://localhost:5000/crops/${farmerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch crops");
      }
      const cropsData = await response.json();
      const farmer = farmers.find((farmer) => farmer.farmerId === farmerId);
      setSelectedFarmer({
        farmerId,
        name: farmer ? farmer.name : "Unknown Farmer",
        crops: cropsData,
      });
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  const openDialog = (type, id) => {
    setDialogType(type);
    setItemToDelete(id);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogType("");
    setItemToDelete(null);
  };

  const handleDeleteFarmer = async () => {
    try {
      const response = await fetch(`http://localhost:5000/farmers/${itemToDelete}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setFarmers((prevFarmers) =>
          prevFarmers.filter((farmer) => farmer.farmerId !== itemToDelete)
        );
        closeDialog();
        setSelectedFarmer(null); // Clear crops if a farmer is deleted
      } else {
        throw new Error("Failed to delete farmer");
      }
    } catch (error) {
      console.error("Error deleting farmer:", error);
    }
  };

  const handleDeleteCrop = async () => {
    try {
      const response = await fetch(`http://localhost:5000/crops/${itemToDelete}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setSelectedFarmer((prevSelectedFarmer) => ({
          ...prevSelectedFarmer,
          crops: prevSelectedFarmer.crops.filter((crop) => crop.cropId !== itemToDelete),
        }));
        closeDialog();
      } else {
        throw new Error("Failed to delete crop");
      }
    } catch (error) {
      console.error("Error deleting crop:", error);
    }
  };

  const openEditDialog = (type, item) => {
    setDialogType(type);
    setItemToEdit(item);
    setEditedData({ ...item });
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setDialogType("");
    setItemToEdit(null);
    setEditedData({});
  };

  const handleEditSubmit = async () => {
    try {
      const id = dialogType === "farmer" ? itemToEdit.farmerId : itemToEdit.cropId;
      console.log("Editing ID:", id, "Edited Data:", editedData);

      const endpoint = dialogType === "farmer" ? "farmers" : "crops";
      const response = await fetch(`http://localhost:5000/${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const updatedItem = await response.json();
      console.log("Updated Item:", updatedItem);

      if (dialogType === "farmer") {
        // Update farmers list
        setFarmers((prevFarmers) =>
          prevFarmers.map((farmer) =>
            farmer.farmerId === itemToEdit.farmerId ? { ...farmer, ...editedData } : farmer
          )
        );
      } else if (dialogType === "crop") {
        // Update crops list
        setSelectedFarmer((prevSelectedFarmer) => ({
          ...prevSelectedFarmer,
          crops: prevSelectedFarmer.crops.map((crop) =>
            crop.cropId === itemToEdit.cropId ? { ...crop, ...editedData } : crop
          ),
        }));
      }

      closeEditDialog(); // Close the dialog
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-100 to-green-50 min-h-screen">
      <h2 className="text-2xl font-bold text-green-900 mb-4">Farmer Wise Crops List</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-green-800">Farmers</h3>
        <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead>
            <tr className="bg-green-200 text-green-900">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Farm Location</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {farmers.length > 0 ? (
              farmers.map((farmer) => (
                <tr
                  key={farmer.farmerId}
                  className="hover:bg-green-100 transition duration-150"
                >
                  <td
                    className="px-4 py-2 cursor-pointer text-green-700"
                    onClick={() => handleSelectFarmer(farmer.farmerId)}
                  >
                    {farmer.name}
                  </td>
                  <td className="px-4 py-2">{farmer.farmLocation}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <IconButton
                      color="primary"
                      onClick={() => openEditDialog("farmer", farmer)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => openDialog("farmer", farmer.farmerId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-2 text-center text-gray-500"
                >
                  No farmers available.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {selectedFarmer && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-green-800">{selectedFarmer.name}'s Crops</h3>
            {selectedFarmer.crops.length > 0 ? (
              <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden mt-4">
                <thead>
                  <tr className="bg-green-200 text-green-900">
                    <th className="px-4 py-2">Crop Name</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedFarmer.crops.map((crop) => (
                    <tr key={crop.cropId} className="hover:bg-green-100 transition duration-150">
                      <td className="px-4 py-2">{crop.cropName}</td>
                      <td className="px-4 py-2">{crop.category}</td>
                      <td className="px-4 py-2">{crop.quantity}</td>
                      <td className="px-4 py-2">{crop.pricePerUnit}</td>
                      <td className="px-4 py-2 flex space-x-2">
                        <IconButton
                          color="primary"
                          onClick={() => openEditDialog("crop", crop)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => openDialog("crop", crop.cropId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 mt-4">No crops available for this farmer.</p>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {dialogType === "farmer" ? "farmer" : "crop"}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={dialogType === "farmer" ? handleDeleteFarmer : handleDeleteCrop}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Edit {dialogType === "farmer" ? "Farmer" : "Crop"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the updated details for the {dialogType === "farmer" ? "farmer" : "crop"}.
          </DialogContentText>
          <TextField
            label={dialogType === "farmer" ? "Farmer Name" : "Crop Name"}
            fullWidth
            margin="normal"
            value={editedData.name || editedData.cropName || ""}
            onChange={(e) =>
              setEditedData({
                ...editedData,
                name: e.target.value,
                cropName: e.target.value,
              })
            }
          />

          {/* Farm Location Field for Farmer Edit */}
          {dialogType === "farmer" && (
            <TextField
              label="Farm Location"
              fullWidth
              margin="normal"
              value={editedData.farmLocation || ""}
              onChange={(e) =>
                setEditedData({ ...editedData, farmLocation: e.target.value })
              }
            />
          )}

          {dialogType === "crop" && (
            <>
              <TextField
                label="Category"
                fullWidth
                margin="normal"
                value={editedData.category || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, category: e.target.value })
                }
              />
              <TextField
                label="Quantity"
                fullWidth
                margin="normal"
                value={editedData.quantity || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, quantity: e.target.value })
                }
              />
              <TextField
                label="Price per Unit"
                fullWidth
                margin="normal"
                value={editedData.pricePerUnit || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, pricePerUnit: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="secondary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FarmerCropsList;
