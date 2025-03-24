// import React, { useState, useEffect } from "react";
// import SymptomPredictor from "./SymptomPredictor";
// import Squares from "./Squares";
// import Navbar from "./Navbar";

// const Predict = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [prediction, setPrediction] = useState(null);

//   const handlePredictionResult = async (predictionData) => {
//     setPrediction(predictionData);

//     // Check if we have a specialty_id in the prediction
//     if (predictionData && predictionData.specialty_id) {
//       fetchDoctors(predictionData.specialty_id);
//     }
//   };

//   const fetchDoctors = async (specialtyId) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`http://127.0.0.1:5000/user/doctors/specialty/${specialtyId}`);

//       if (!response.ok) {
//         throw new Error('Failed to fetch doctors');
//       }

//       const data = await response.json();
//       setDoctors(data.doctors || []);
//     } catch (err) {
//       console.error('Error fetching doctors:', err);
//       setError('Failed to load doctors. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex flex-col bg-transparent">
//       {/* Background Animation */}
//       <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#eeab78]">
//       </div>

//       {/* Full-width Navbar with padding */}
//       <div className="w-full px-4 md:px-6 lg:px-2 py-2">
//         <Navbar className="w-full" />
//       </div>

//       {/* Content container - Centered */}
//       <div className="flex flex-col items-center w-full z-10 mt-2">
//         {/* Prediction Box */}
//         <div className="prediction-box">
//           <SymptomPredictor onPredictionResult={handlePredictionResult} />
//         </div>

//         {/* Doctors List */}
//         {prediction && prediction.specialty_id && (
//           <div className="mt-8 w-full max-w-3xl">
//             <div className="bg-white rounded-lg shadow-lg p-6">
//               <h2 className="text-2xl font-bold mb-4">Recommended Doctors</h2>

//               {loading ? (
//                 <div className="flex justify-center py-8">
//                   <div className="animate-pulse text-center">
//                     <p>Loading doctors...</p>
//                   </div>
//                 </div>
//               ) : error ? (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                   <p>{error}</p>
//                 </div>
//               ) : doctors.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {doctors.map((doctor) => (
//                     <div key={doctor._id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-300">
//                       <h3 className="text-xl font-semibold">{doctor.name}</h3>
//                       <p className="text-gray-600 mb-2">{doctor.qualification}</p>
//                       <p className="text-sm text-gray-500">{doctor.address}</p>
//                       <div className="mt-3 flex justify-between items-center">
//                         <span className="text-blue-500">{doctor.contact_no}</span>
//                         <button className="bg-gradient-to-r from-[#ff8c42] to-[#ff3e55] text-white px-4 py-2 rounded hover:from-[#ff3e55] hover:to-[#ff8c42] transition-all duration-300">
//                           Book Appointment
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <p className="text-gray-500">No doctors found for this condition.</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Predict;

import React, { useState, useEffect } from "react";
import SymptomPredictor from "./SymptomPredictor";
import Navbar from "./Navbar";
import FloatingChatBot from "./FloatingChatBot"; // Import the new component

const Predict = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handlePredictionResult = async (predictionData) => {
    setPrediction(predictionData);

    // Check if we have a specialty_id in the prediction
    if (predictionData && predictionData.specialty_id) {
      fetchDoctors(predictionData.specialty_id);
    }
  };

  const fetchDoctors = async (specialtyId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/user/doctors/specialty/${specialtyId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch doctors");
      }

      const data = await response.json();
      setDoctors(data.doctors || []);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent">
      {/* Background Animation */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#80B5C7]"></div>

      {/* Full-width Navbar with padding */}
      {/* <div className="w-full px-4 md:px-6 lg:px-2 py-2">
        <Navbar className="w-full" />
      </div> */}

      {/* Content container - Centered */}
      <div className="flex flex-col items-center w-full z-10 mt-2">
        {/* Prediction Box */}
        <div className="prediction-box">
          <SymptomPredictor onPredictionResult={handlePredictionResult} />
        </div>

        {/* Doctors List */}
        {prediction && prediction.specialty_id && (
          <div className="mt-8 w-full max-w-3xl">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Recommended Doctors</h2>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse text-center">
                    <p>Loading doctors...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p>{error}</p>
                </div>
              ) : doctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor._id}
                      className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold">{doctor.name}</h3>
                      <p className="text-gray-600 mb-2">
                        {doctor.qualification}
                      </p>
                      <p className="text-sm text-gray-500">{doctor.address}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-blue-500">
                          {doctor.contact_no}
                        </span>
                        <button className="bg-gradient-to-r from-[#ff8c42] to-[#ff3e55] text-white px-4 py-2 rounded hover:from-[#ff3e55] hover:to-[#ff8c42] transition-all duration-300">
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No doctors found for this condition.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add the Floating ChatBot */}
      <FloatingChatBot />
    </div>
  );
};

export default Predict;
