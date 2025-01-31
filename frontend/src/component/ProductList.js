import React, { useContext } from "react";
import { FarmerContext } from "../context/FarmerContext";

const ProductList = () => {
  const { farmerInfo, removeProduct } = useContext(FarmerContext);

  const handleRemove = (productName) => {
    removeProduct(productName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-green-300 p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-green-700 mb-8 shadow-md rounded-lg py-3 px-6 bg-white">
        🌟 Farm Products Showcase
      </h2>
      {farmerInfo.farmProducts.length === 0 ? (
        <p className="text-lg text-gray-600 font-medium">
          No products available. Please add some!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {farmerInfo.farmProducts.map((product) => (
            <div
              key={product.id}
              className="relative bg-white rounded-lg shadow-lg hover:shadow-xl p-6 transition-transform transform hover:scale-105"
            >
              {/* Ribbon Tag */}
              <div className="absolute top-2 right-2 bg-green-500 text-white text-sm px-4 py-1 rounded-full shadow-md">
                {product.category}
              </div>
              {/* Card Content */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600">
                <span className="font-medium">Quantity:</span> {product.quantity}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Price:</span> ${product.pricePerUnit}
              </p>
              {/* Action Button */}
              <button
                onClick={() => handleRemove(product.name)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-colors duration-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
