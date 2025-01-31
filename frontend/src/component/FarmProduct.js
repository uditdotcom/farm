import React from "react";

export default function FarmProduct() {
  const products = [
    { name: "Tomato", type: "Vegetable", quantity: 120 },
    { name: "Apple", type: "Fruit", quantity: 75 },
    { name: "Wheat", type: "Grain", quantity: 200 },
    { name: "Carrot", type: "Vegetable", quantity: 150 },
    { name: "Banana", type: "Fruit", quantity: 100 },
    { name: "Corn", type: "Grain", quantity: 180 },
    { name: "Potato", type: "Vegetable", quantity: 200 },
    { name: "Orange", type: "Fruit", quantity: 90 },
    { name: "Rice", type: "Grain", quantity: 250 },
    { name: "Cucumber", type: "Vegetable", quantity: 80 },
    { name: "Strawberry", type: "Fruit", quantity: 60 },
    { name: "Barley", type: "Grain", quantity: 170 },
    { name: "Lettuce", type: "Vegetable", quantity: 100 },
    { name: "Mango", type: "Fruit", quantity: 70 },
    { name: "Oats", type: "Grain", quantity: 140 },
    { name: "Broccoli", type: "Vegetable", quantity: 90 },
    { name: "Grapes", type: "Fruit", quantity: 85 },
    { name: "Quinoa", type: "Grain", quantity: 110 },
    { name: "Spinach", type: "Vegetable", quantity: 70 },
    { name: "Pineapple", type: "Fruit", quantity: 50 },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gradient-to-br from-green-200 via-yellow-100 to-green-300">
      <h1 className="text-4xl font-extrabold text-teal-700 mb-8">
        🌟 Farm Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl px-4">
        {products.map((product, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
              product.type === "Vegetable"
                ? "bg-gradient-to-br from-green-300 to-green-500"
                : product.type === "Fruit"
                ? "bg-gradient-to-br from-yellow-300 to-yellow-500"
                : "bg-gradient-to-br from-red-300 to-red-500"
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {product.name}
            </h3>
            <p className="text-white text-lg">
              <span className="font-semibold">Type:</span> {product.type}
            </p>
            <p className="text-white text-lg">
              <span className="font-semibold">Quantity:</span> {product.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
