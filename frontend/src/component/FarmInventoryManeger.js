// import React, { useEffect, useState } from "react";

// export default function FarmInventoryManeger() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     setTimeout(() => {
//       fetch("https://api.jsonbin.io/v3/b/671a0377acd3cb34a89c2c5f")
//         .then((res) => res.json())
//         .then((data) => {
//           if (data && data.record && Array.isArray(data.record.farmProducts)) {
//             setProducts(data.record.farmProducts);
//           } else {
//             console.error("Invalid API response", data);
//           }
//         })
//         .catch((error) => console.error("Error in Fatching data", error));
//     }, 1000);
//   }, []);

//   return (
//     <div>
//       <h2>Product List</h2>
//       {products.length > 0 ? (
        
//         <div>
//           {products.map((product) => {
//             return(
//             <div key={product.id}>
//               <p>Name : {product.productName}</p>
//               <p>Price Per Unit : {product.pricePerUnit}</p>
//               <p>Quantity : {product.quantity}</p>
//               <p>Category : {product.category}</p>
//               <p>Notes : {product.notes}</p>
//             </div>
//           )})}
//         </div>
//       ) : (
//         <p>Loading Products</p>
//       )}
//       ;
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";

// export default function FarmInventoryManager() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       fetch("https://api.jsonbin.io/v3/b/671a0377acd3cb34a89c2c5f")
//         .then((res) => res.json())
//         .then((data) => {
//           if (data && data.record && Array.isArray(data.record.farmProducts)) {
//             setProducts(data.record.farmProducts);
//             setLoading(false);
//           } else {
//             console.error("Invalid API response", data);
//             setLoading(false);
//           }
//         })
//         .catch((error) => {
//           console.error("Error in fetching data", error);
//           setLoading(false);
//         });
//     }, 1000);
//   }, []);


  

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Farm Product Inventory
//       </h2>

//       {loading ? (
//         <div className="flex justify-center items-center space-x-2">
//           <div className="w-16 h-16 border-4 border-t-4 border-green-600 border-solid rounded-full animate-spin"></div>
//           <p className="text-lg text-gray-700">Loading Products...</p>
//         </div>
//       ) : (
//         <>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="bg-white border border-gray-300 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
//             >
//               {/* Header */}
//               <div className="bg-green-100 p-4 rounded-t-lg">
//                 <h3 className="text-lg font-semibold text-green-800">
//                   {product.productName}
//                 </h3>
//               </div>

//               {/* Content */}
//               <div className="p-4 space-y-2">
//                 <div className="flex items-center space-x-2">
//                   <span className="material-icons text-green-500"></span>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Price Per Unit:</span> ${product.pricePerUnit}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="material-icons text-yellow-500">inventory</span>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Quantity:</span> {product.quantity}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="material-icons text-blue-500">category</span>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Category:</span> {product.category}
//                   </p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className="material-icons text-red-500">note</span>
//                   <p className="text-gray-700">
//                     <span className="font-medium">Notes:</span> {product.notes || "N/A"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         </>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";

export default function FarmInventoryManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form fields state
  const [newProduct, setNewProduct] = useState({
    productName: "",
    pricePerUnit: "",
    quantity: "",
    category: "",
    notes: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit new product
  const handleSubmit = (e) => {
    e.preventDefault();

    const newProductData = {
      ...newProduct,
      id: Date.now(), // Generate a unique ID based on timestamp
    };

    setProducts((prevProducts) => [ ...prevProducts , newProductData]);

    // Reset form fields after submission
    setNewProduct({
      productName: "",
      pricePerUnit: "",
      quantity: "",
      category: "",
      notes: "",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      fetch("https://api.jsonbin.io/v3/b/671a0377acd3cb34a89c2c5f")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.record && Array.isArray(data.record.farmProducts)) {
            setProducts(data.record.farmProducts);
            setLoading(false);
          } else {
            console.error("Invalid API response", data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error("Error in fetching data", error);
          setLoading(false);
        });
    }, 1000);
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Farm Product Inventory
      </h2>

      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="w-16 h-16 border-4 border-t-4 border-green-600 border-solid rounded-full animate-spin"></div>
          <p className="text-lg text-gray-700">Loading Products...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-300 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                {/* Header */}
                <div className="bg-green-100 p-4 rounded-t-lg">
                  <h3 className="text-lg font-semibold text-green-800">
                    {product.productName}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-green-500">₹</span>
                    <p className="text-gray-700">
                      <span className="font-medium">Price Per Unit:</span> ₹{product.pricePerUnit}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-yellow-500">inventory</span>
                    <p className="text-gray-700">
                      <span className="font-medium">Quantity:</span> {product.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-blue-500">category</span>
                    <p className="text-gray-700">
                      <span className="font-medium">Category:</span> {product.category}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="material-icons text-red-500">note</span>
                    <p className="text-gray-700">
                      <span className="font-medium">Notes:</span> {product.notes || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Product Form */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Add New Product
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={newProduct.productName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Price Per Unit</label>
                  <input
                    type="number"
                    name="pricePerUnit"
                    value={newProduct.pricePerUnit}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={newProduct.quantity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Category</label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Grain">Grain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700">Notes</label>
                  <textarea
                    name="notes"
                    value={newProduct.notes}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
