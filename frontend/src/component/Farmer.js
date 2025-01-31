import React from "react";

export default function Farmer() {
  const farmers = [
    { name: "Bhushan Satote", age: 21, location: "Surat" },
    { name: "Dhruv", age: 20, location: "Surat" },
    { name: "Harsh Patel", age: 22, location: "Daman" },
    { name: "Umer Saiyad", age: 22, location: "Kadod" },
    { name: "Sahil Garasiya", age: 22, location: "Mahuva" },
    { name: "Swayam Patel", age: 22, location: "Surat" },
    { name: "Punit Katariya", age: 22, location: "Ahemdabad" },
    { name: "Mahesh Bhoi", age: 22, location: "Jalgaon" },
    { name: "Rohit Bhoi", age: 22, location: "Jalgaon" },
  ];

  return (
    <div className="flex flex-col items-center py-8 bg-gradient-to-br from-green-300 via-yellow-200 to-green-500">
      <h1 className="text-4xl font-bold text-brown-800 mb-6">🌾 Farmers List</h1>
      <p className="text-lg text-brown-700 italic mb-10">
        Meet our hardworking farmers who are growing for a sustainable future!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {farmers.map((farmer, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-green-500"
          >
            <div className="relative p-6">
              {/* Decorative Top Bar */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 to-green-500 rounded-t-xl"></div>
              {/* Farmer Avatar */}
              <div className="bg-green-600 text-white rounded-full h-16 w-16 flex justify-center items-center mx-auto mb-4">
                <span className="text-2xl font-bold">{farmer.name[0]}</span>
              </div>
              {/* Farmer Info */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-800">{farmer.name}</h3>
                <p className="text-brown-700 text-lg">
                  <span className="font-semibold">Age:</span> {farmer.age}
                </p>
                <p className="text-brown-700 text-lg">
                  <span className="font-semibold">Location:</span> {farmer.location}
                </p>
              </div>
              {/* Decorative Bottom Bar */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-yellow-500 rounded-b-xl"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
