

// import React, { useState, useContext } from "react";
// import { FarmerContext } from "../context/FarmerContext";

// const AddFarmProduct = () => {
//   const { addFarmProduct } = useContext(FarmerContext);
//   const [formState, setFormState] = useState({
//     productName: "",
//     pricePerUnit: "",
//     quantity: "",
//     category: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormState((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addFarmProduct(formState);
//     setFormState({
//       productName: "",
//       pricePerUnit: "",
//       quantity: "",
//       category: "",
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4">
//       <h2>Add New Product</h2>
//       <input
//         type="text"
//         name="productName"
//         placeholder="Product Name"
//         value={formState.productName}
//         onChange={handleInputChange}
//         required
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="number"
//         name="pricePerUnit"
//         placeholder="Price Per Unit"
//         value={formState.pricePerUnit}
//         onChange={handleInputChange}
//         required
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         type="number"
//         name="quantity"
//         placeholder="Quantity"
//         value={formState.quantity}
//         onChange={handleInputChange}
//         required
//         className="border p-2 mb-2 w-full"
//       />
//       <select
//         name="category"
//         value={formState.category}
//         onChange={handleInputChange}
//         required
//         className="border p-2 mb-2 w-full"
//       >
//         <option value="">Select Category</option>
//         <option value="Vegetable">Vegetable</option>
//         <option value="Fruit">Fruit</option>
//         <option value="Dairy">Dairy</option>
//         <option value="Grain">Grain</option>
//       </select>
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         Add Product
//       </button>
//     </form>
//   );
// };

// export default AddFarmProduct;


import React, { useState, useContext } from "react";
import { FarmerContext } from "../context/FarmerContext";

const AddFarmProduct = () => {
  const { addFarmProduct } = useContext(FarmerContext);
  const [formState, setFormState] = useState({
    productName: "",
    pricePerUnit: "",
    quantity: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFarmProduct(formState);
    setFormState({
      productName: "",
      pricePerUnit: "",
      quantity: "",
      category: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-green-300 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-green-700 text-center mb-6">
          🌾 Add New Farm Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg text-green-600 mb-2">Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formState.productName}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-lg text-green-600 mb-2">Price Per Unit</label>
            <input
              type="number"
              name="pricePerUnit"
              placeholder="Enter price per unit"
              value={formState.pricePerUnit}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-lg text-green-600 mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              value={formState.quantity}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-lg text-green-600 mb-2">Category</label>
            <select
              name="category"
              value={formState.category}
              onChange={handleInputChange}
              required
              className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Category</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Dairy">Dairy</option>
              <option value="Grain">Grain</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFarmProduct;
