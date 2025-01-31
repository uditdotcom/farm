// import React, { useEffect, useState } from "react";

// export default function CropForm() {
//   const [farmers, setFarmers] = useState([]);
//   const [formData, setFormData] = useState({
//     farmerId: "",
//     cropName: "",
//     category: "",
//     quantity: "",
//     unit: "",
//     pricePerUnit: "",
//     harvestSeason: "",
//   });

//   useEffect(() => {
//     fetch("http://localhost:5000/farmers")
//       .then((res) => res.json())
//       .then((data) => setFarmers(data))
//       .catch(() => alert("Failed to Fetch Farmers"));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.farmerId || !formData.cropName || !formData.category) {
//       alert("All fields are required.");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:5000/farmers/${formData.farmerId}/crops`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         alert("Crops Added Successfully");
//         setFormData({
//           ...formData,
//           cropName: "",
//           quantity: "",
//           unit: "",
//           pricePerUnit: "",
//           harvestSeason: "",
//         });
//       } else {
//         const data = await response.json();
//         alert(data.message || "Failed to add crop.");
//       }
//     } catch {
//       alert("Failed to connect to the Server");
//     }
//   };

//   return (
//     <div>
//       <h2>Crop Entry Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <select
//             name="farmer"
//             id="farmer"
//             value={formData.farmerId}
//             onChange={(e) =>
//               setFormData({ ...formData, farmerId: e.target.value })
//             }
//           >
//             <option value="">Select Farmer</option>
//             {farmers.map((farmer) => (
//               <option key={farmer.farmerId} value={farmer.farmerId}>
//                 {farmer.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <input
//             type="text"
//             placeholder="Enter Crop Name"
//             value={formData.cropName}
//             onChange={(e) =>
//               setFormData({ ...formData, cropName: e.target.value })
//             }
//             required
//           />
//         </div>

//         <div>
//           <select
//             name="category"
//             id="category"
//             value={formData.category}
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//           >
//             <option value="">Select Category</option>
//             <option value="Grains">Grains</option>
//             <option value="Vegetables">Vegetables</option>
//             <option value="Fruits">Fruits</option>
//           </select>
//         </div>

//         {formData.category === "Grains" && (
//           <div>
//             <input
//               type="text"
//               placeholder="Enter Harvest Season"
//               value={formData.harvestSeason}
//               onChange={(e) =>
//                 setFormData({ ...formData, harvestSeason: e.target.value })
//               }
//             />
//           </div>
//         )}

//         <div>
//           <input
//             type="number"
//             name="quantity"
//             id="quantity"
//             placeholder="Enter Quantity"
//             value={formData.quantity}
//             onChange={(e) =>
//               setFormData({ ...formData, quantity: e.target.value })
//             }
//             required
//           />
//         </div>

//         <div>
//           <select
//             name="unit"
//             id="unit"
//             value={formData.unit}
//             onChange={(e) =>
//               setFormData({ ...formData, unit: e.target.value })
//             }
//           >
//             <option value="">Select Unit</option>
//             <option value="kg">KG</option>
//             <option value="quintal">Quintal</option>
//             <option value="dozen">Dozen</option>
//             <option value="pieces">Pieces</option>
//           </select>
//         </div>

//         <div>
//           <input
//             type="number"
//             placeholder="Enter Price Per Unit"
//             value={formData.pricePerUnit}
//             onChange={(e) =>
//               setFormData({ ...formData, pricePerUnit: e.target.value })
//             }
//             required
//           />
//         </div>

//         <button type="submit">Add Crop</button>
//       </form>
//     </div>
//   );
// }import React, { useState, useEffect } from "react";

import React, { useState, useEffect } from "react";

const CropForm = () => {
  const [formData, setFormData] = useState({
    cropName: "",
    category: "Grains",
    quantity: "",
    unit: "",
    pricePerUnit: "",
    harvestSeason: "",
    farmerId: "",
  });

  const [farmers, setFarmers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch("http://localhost:5000/farmers");
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to fetch farmers");
        }
        const data = await response.json();
        setFarmers(data);
      } catch (error) {
        console.error("Error fetching farmers:", error);
        setError(error.message);
      }
    };

    fetchFarmers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { cropName, category, quantity, unit, pricePerUnit, harvestSeason, farmerId } = formData;

      if (!farmerId) {
        throw new Error("Please select a farmer.");
      }

      const response = await fetch(`http://localhost:5000/farmers/${farmerId}/crops`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cropName,
          category,
          quantity,
          unit,
          pricePerUnit,
          harvestSeason,
          farmerId,
        }),
      });

      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (!response.ok) {
        throw new Error(responseText || "Failed to add crop");
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        const data = JSON.parse(responseText);
        console.log("Response Data:", data);
      } else {
        throw new Error("Unexpected response format");
      }

      alert("Crop added successfully!");
      setFormData({
        cropName: "",
        category: "Grains",
        quantity: "",
        unit: "",
        pricePerUnit: "",
        harvestSeason: "",
        farmerId: "",
      });
      setError("");
    } catch (error) {
      console.error("Error:", error);
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-50 p-6 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-8">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">Add New Crop</h2>

        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex justify-between items-center">
            <p>{error}</p>
            <button onClick={() => setError("")} className="text-red-500 hover:text-red-700">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-800">Select Farmer:</label>
            <select
              name="farmerId"
              value={formData.farmerId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="">Select Farmer</option>
              {farmers.map((farmer) => (
                <option key={farmer.farmerId} value={farmer.farmerId}>
                  {farmer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder="Crop Name"
              name="cropName"
              value={formData.cropName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            >
              <option value="Grains">Grains</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
            </select>
          </div>

          <div>
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Price per Unit"
              name="pricePerUnit"
              value={formData.pricePerUnit}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          {formData.category === "Grains" && (
            <div>
              <input
                type="text"
                placeholder="Harvest Season"
                name="harvestSeason"
                value={formData.harvestSeason}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
          >
            Add Crop
          </button>
        </form>
      </div>
    </div>
  );
};

export default CropForm;
