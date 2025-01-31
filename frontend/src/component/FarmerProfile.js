import React, { useContext } from "react";
import { FarmerContext } from "../context/FarmerContext";
import {Link } from "react-router-dom";


const FarmerProfile = () => {
  const { farmerInfo } = useContext(FarmerContext);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-green-300">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full transition-transform transform hover:scale-105 hover:shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            🌾 Farmer Profile
          </h2>
          <p className="text-gray-600 italic">
            Growing the best for a sustainable future!
          </p>
        </div>
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold text-green-700">Name: </span>
            <span className="text-lg text-gray-800 ml-2">
              {farmerInfo.name || "N/A"}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-xl font-semibold text-green-700">
              Contact:{" "}
            </span>
            <span className="text-lg text-gray-800 ml-2">
              {farmerInfo.contact || "N/A"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-semibold text-green-700">
              Location:{" "}
            </span>
            <span className="text-lg text-gray-800 ml-2">
              {farmerInfo.location || "N/A"}
            </span>
            
          </div>
        </div>
        <div className="mt-8 text-center">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md focus:outline-none transition-all">
            <Link to="/update-profile">Update Profile </Link>
          </button>

          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 ml-2 rounded-lg shadow-md focus:outline-none transition-all">
            <Link to="/view-product">View Product</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;

// import React, { useContext } from "react";
// import { FarmerContext } from "../context/FarmerContext";

// const FarmerProfile = () => {
//   const { farmers, editFarmer, removeFarmer } = useContext(FarmerContext);

//   if (!Array.isArray(farmers) || farmers.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-green-300">
//         <p className="text-lg text-gray-600">No farmer profiles available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-br from-green-200 via-yellow-100 to-green-300 min-h-screen p-8">
//       <div className="text-center mb-12">
//         <h2 className="text-4xl font-bold text-green-700 mb-4">🌾 Farmer Profiles</h2>
//         <p className="text-lg text-gray-600 italic">
//           Manage the profiles of our hardworking farmers.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//         {farmers.map((farmer) => (
//           <div
//             key={farmer.id}
//             className="bg-white rounded-xl shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl"
//           >
//             <div className="text-center">
//               <h3 className="text-2xl font-bold text-green-700 mb-2">{farmer.name}</h3>
//               <p className="text-gray-600 italic">Dedicated to sustainability 🌱</p>
//             </div>
//             <div className="mt-4">
//               <p>
//                 <span className="font-semibold text-green-700">Contact:</span> {farmer.contact}
//               </p>
//               <p>
//                 <span className="font-semibold text-green-700">Location:</span> {farmer.location}
//               </p>
//             </div>
//             <div className="mt-6 flex justify-between">
//               <button
//                 onClick={() => editFarmer(farmer.id)}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => removeFarmer(farmer.id)}
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FarmerProfile;
