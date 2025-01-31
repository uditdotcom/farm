import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./component/Home";
import FarmInventoryManeger from "./component/FarmInventoryManeger";
import { FarmerProvider } from "./context/FarmerContext";
import FarmerProfile from "./component/FarmerProfile";
import ProductList from "./component/ProductList";
import AddFarmProduct from "./component/AddFarmProduct";
import AddFarmer from "./component/AddFarmer";
import FarmProduct from "./component/FarmProduct";
import FarmInventoryManager from "./component/FarmInventoryManeger";
import Farmer from "./component/Farmer";
import UpdateFarmerInfo from "./component/UpdateFarmerInfo";
import FarmerForm from "./component/FarmerForm";
import CropForm from "./component/CropForm";
import FarmerCropList from "./component/FarmerCropList";

function App() {
  return (
  //   <FarmerProvider>
  //   <Router>
  //     <div className="App">
  //       <Routes>
  //         <Route path="/" element={<FarmerProfile />} />
  //         <Route path="/products" element={<ProductList />} />
  //         <Route path="/add-product" element={<AddFarmProduct />} />
  //       </Routes>
  //     </div>
  //   </Router>
  // </FarmerProvider>
  
  <FarmerProvider>
    <Router>
      <div className="App">
        {/* Navigation Menu */}

        <nav className="bg-green-600 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="text-white font-bold text-2xl">
              <Link to="/">Farm Management System</Link>
            </div>

            {/* Navigation Links */}
            <ul className="hidden md:flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-white font-medium hover:text-yellow-300 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/farmers"
                  className="text-white font-medium hover:text-yellow-300 transition"
                >
                  Farmers
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-white font-medium hover:text-yellow-300 transition"
                >
                  Products
                </Link>
              </li>
              <li>
                  <Link
                    to="/inventory"
                   className="text-white font-medium hover:text-yellow-300 transition"
                  >
                    Inventory
                  </Link>
              </li>
              <li>
                  <Link
                    to="/profile"
                   className="text-white font-medium hover:text-yellow-300 transition"
                  >
                    Profile
                  </Link>
              </li>
              <li>
                  <Link
                    to="/farmer-form"
                   className="text-white font-medium hover:text-yellow-300 transition"
                  >
                    Add Farmer
                  </Link>
              </li>
              <li>
                  <Link
                    to="/crop-form"
                   className="text-white font-medium hover:text-yellow-300 transition"
                  >
                    Add Crop
                  </Link>
              </li>
              <li>
                  <Link
                    to="/farmer-crop"
                   className="text-white font-medium hover:text-yellow-300 transition"
                  >
                    Farmer-Crop
                  </Link>
              </li>
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                id="menu-toggle"
                className="text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                onClick={() =>
                  document
                    .getElementById("mobile-menu")
                    .classList.toggle("hidden")
                }
              >
                ☰
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <ul
            id="mobile-menu"
            className="bg-green-600 space-y-4 mt-4 hidden md:hidden flex flex-col items-center"
          >
            <li>
              <Link
                to="/"
                className="text-white font-medium hover:text-yellow-300 transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/farmers"
                className="text-white font-medium hover:text-yellow-300 transition"
              >
                Farmers
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-white font-medium hover:text-yellow-300 transition"
              >
                Products
              </Link>
            </li>
            
            <li>
              <Link
                to="/inventory"
                className="text-white font-medium hover:text-yellow-300 transition"
              >
                Inventory
              </Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/farmers" element={<Farmer/>} />
          <Route path="/products" element={<FarmProduct/>} />
          {/* <Route path="/add-products" element={<AddFarmProduct />} />
          <Route path="/add-farmer" element={<AddFarmer />} /> */}
          <Route path="/inventory" element={<FarmInventoryManager />} />
          <Route path="/profile" element={<FarmerProfile />} />
          <Route path="/update-profile" element={<UpdateFarmerInfo />} />
          <Route path="/view-product" element={<ProductList />} />
          <Route path="/farmer-form" element={<FarmerForm />} />
          <Route path="/crop-form" element={<CropForm />} />
          <Route path="/farmer-crop" element={<FarmerCropList />} />
        </Routes>
      </div>
    </Router>
    </FarmerProvider>
  );
}

export default App;
