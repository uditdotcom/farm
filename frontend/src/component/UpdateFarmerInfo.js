import React, { useContext, useState } from "react";
import { FarmerContext } from "../context/FarmerContext";
import { useNavigate } from "react-router-dom";

export default function UpdateFarmerInfo() {
  const { farmerInfo, updateFarmerInfo } = useContext(FarmerContext);
  const navigate = useNavigate();
  const [updateInfo, setUpdateInfo] = useState({
    name: farmerInfo.name,
    contact: farmerInfo.contact,
    location: farmerInfo.location,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateFarmerInfo(updateInfo);
    navigate("/profile");
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-200 via-yellow-100 to-green-300 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
        🌾 Update Farmer Information
      </h2>
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={updateInfo.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contact
            </label>
            <input
              type="number"
              id="contact"
              name="contact"
              value={updateInfo.contact}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={updateInfo.location}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
          >
            Update Farmer Info
          </button>
        </form>
      </div>
    </div>
  );
}
