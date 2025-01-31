// import React from "react";
// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 p-8">
//       {/* Heading Section */}
//       <h1 className="text-5xl font-extrabold text-green-800 mb-4">
//         Welcome to Farm Management System 🌾
//       </h1>
//       <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl">
//         Manage your farms efficiently! This system allows you to keep track of
//         farmers, products, and inventory with ease. Simplify your operations
//         and focus on growing a sustainable future.
//       </p>

//       {/* Call to Action Buttons */}
//       <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
//         <Link
//           to="/farmers"
//           className="px-6 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 hover:shadow-lg transition"
//         >
//           👩‍🌾 Manage Farmers
//         </Link>
//         <Link
//           to="/products"
//           className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg transition"
//         >
//           🛒 Manage Products
//         </Link>
//       </div>

//       {/* Illustrations Section */}
//       <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//         {/* Illustration 1 */}
//         <div className="flex flex-col items-center text-center">
//           <img
//             src="https://images.unsplash.com/photo-1575091317298-83c5351a79f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt="Farmer working in a field"
//             className="w-36 h-36 md:w-48 md:h-48 rounded-full shadow-lg"
//           />
//           <p className="text-lg text-gray-700 mt-4">
//             Keep track of all your farmers and manage their activities with ease.
//           </p>
//         </div>

//         {/* Illustration 2 */}
//         <div className="flex flex-col items-center text-center">
//           <img
//             src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt="Fresh farm products"
//             className="w-36 h-36 md:w-48 md:h-48 rounded-full shadow-lg"
//           />
//           <p className="text-lg text-gray-700 mt-4">
//             Monitor your products and their availability in real-time.
//           </p>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <footer className="mt-16 text-gray-500 text-sm">
//         © {new Date().getFullYear()} Farm Management System. All rights
//         reserved.
//       </footer>
//     </div>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 p-8">
      {/* Heading Section */}
      <h1 className="text-5xl font-extrabold text-green-800 mb-6">
        Welcome to Farm Management System 🌾
      </h1>
      <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl">
        Manage your farms efficiently! This system allows you to keep track of
        farmers, products, and inventory with ease. Simplify your operations
        and focus on growing a sustainable future.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <Link
          to="/farmers"
          className="px-8 py-4 bg-green-600 text-white text-lg rounded-lg shadow-xl hover:bg-green-700 hover:shadow-2xl transition duration-300 transform hover:scale-105"
        >
          👩‍🌾 Manage Farmers
        </Link>
        <Link
          to="/products"
          className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg shadow-xl hover:bg-blue-700 hover:shadow-2xl transition duration-300 transform hover:scale-105"
        >
          🛒 Manage Products
        </Link>
      </div>

      {/* Illustrations Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Illustration 1 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://images.unsplash.com/photo-1575091317298-83c5351a79f2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Farmer working in a field"
            className="w-36 h-36 md:w-48 md:h-48 rounded-full shadow-xl transform hover:scale-110 transition duration-300"
          />
          <p className="text-lg text-gray-700 mt-4">
            Keep track of all your farmers and manage their activities with ease.
          </p>
        </div>

        {/* Illustration 2 */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fresh farm products"
            className="w-36 h-36 md:w-48 md:h-48 rounded-full shadow-xl transform hover:scale-110 transition duration-300"
          />
          <p className="text-lg text-gray-700 mt-4">
            Monitor your products and their availability in real-time.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} Farm Management System. All rights
        reserved.
      </footer>
    </div>
  );
}
