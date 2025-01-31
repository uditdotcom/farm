// import React, { useState } from "react";

// export default function FarmerForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     contact: {
//       phone: "",
//       email: "",
//     },
//     farmLocation: "",
//   });

//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (
//       !formData.name ||
//       !formData.contact.phone ||
//       !formData.contact.email ||
//       !formData.farmLocation
//     ) {
//       setError("All fields are required.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/farmers", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         alert("Farmer added successfully.");
//         setFormData({
//           name: "",
//           contact: { phone: "", email: "" },
//           farmLocation: "",
//         });
//         setError("");
//       } else {
//         const data = await response.json();
//         setError(data.message || "Failed to add farmer.");
//       }
//     } catch (error) {
//       setError("Failed to connect to the server.");
//     }
//   };

//   return (
//     <div>
//       <h2>Add Farmer</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="text"
//             placeholder="Enter Your Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             required
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             placeholder="Enter Your Phone"
//             value={formData.contact.phone}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 contact: { ...formData.contact, phone: e.target.value },
//               })
//             }
//             required
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             placeholder="Enter Your Email"
//             value={formData.contact.email}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 contact: { ...formData.contact, email: e.target.value },
//               })
//             }
//             required
//           />
//         </div>

//         <div>
//           <input
//             type="text"
//             placeholder="Enter Your Location"
//             value={formData.farmLocation}
//             onChange={(e) =>
//               setFormData({ ...formData, farmLocation: e.target.value })
//             }
//             required
//           />
//         </div>

//         <button type="submit">Add Farmer</button>
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// }


import React, { useState } from "react";

export default function FarmerForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: {
      phone: "",
      email: "",
    },
    farmLocation: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.contact.phone ||
      !formData.contact.email ||
      !formData.farmLocation
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/farmers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Farmer added successfully.");
        setFormData({
          name: "",
          contact: { phone: "", email: "" },
          farmLocation: "",
        });
        setError("");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to add farmer.");
      }
    } catch (error) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-200 via-yellow-100 to-green-300 min-h-screen flex items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-lg w-full p-8">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
          Add Farmer
        </h2>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex justify-between items-center">
            <p>{error}</p>
            <button onClick={() => setError("")} className="text-red-500 hover:text-red-700">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L10 8.586 7.707 6.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Your Phone"
              value={formData.contact.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value },
                })
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={formData.contact.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value },
                })
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter Your Location"
              value={formData.farmLocation}
              onChange={(e) =>
                setFormData({ ...formData, farmLocation: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-medium hover:bg-green-700 transition-colors"
          >
            Add Farmer
          </button>
        </form>
      </div>
    </div>
  );
}
