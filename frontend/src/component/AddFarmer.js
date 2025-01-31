import React, { useState, useContext } from "react";
import { FarmerContext } from "../context/FarmerContext";

const AddFarmer = () => {
  const { addFarmer } = useContext(FarmerContext);
  const [farmer, setFarmer] = useState({ name: "", contact: "", location: "" });

  const handleChange = (e) => {
    setFarmer({ ...farmer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFarmer(farmer);
    setFarmer({ name: "", contact: "", location: "" });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
        Add Farmer
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={farmer.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="contact"
            value={farmer.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="location"
            value={farmer.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Add Farmer
        </button>
      </form>
    </div>
  );
};

export default AddFarmer;
