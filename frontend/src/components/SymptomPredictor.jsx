// import { useState, useEffect } from 'react';
// import { X } from 'lucide-react';

// const SymptomPredictor = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [symptoms, setSymptoms] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [allSymptoms, setAllSymptoms] = useState([]);
//   const [fileError, setFileError] = useState(null);

//   // Load symptoms from file
//   useEffect(() => {
//     const loadSymptoms = async () => {
//       try {
//         const response = await fetch('/symptoms.txt');
//         if (!response.ok) {
//           throw new Error('Failed to load symptoms file');
//         }
//         const text = await response.text();
//         // Split by newlines and filter out empty lines
//         const symptoms = text.split('\n')
//           .map(symptom => symptom.trim())
//           .filter(symptom => symptom.length > 0);
        
//         setAllSymptoms(symptoms);
//       } catch (err) {
//         console.error('Error loading symptoms:', err);
//         setFileError('Failed to load symptoms list. Please try again later.');
//       }
//     };

//     loadSymptoms();
//   }, []);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);
    
//     if (value.trim()) {
//       const filtered = allSymptoms.filter(
//         symptom => 
//           symptom.toLowerCase().includes(value.toLowerCase()) && 
//           !symptoms.includes(symptom)
//       );
//       setSuggestions(filtered);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const addSymptom = (symptom) => {
//     if (!symptoms.includes(symptom)) {
//       setSymptoms([...symptoms, symptom]);
//       setInputValue('');
//       setSuggestions([]);
//     }
//   };

//   const removeSymptom = (symptomToRemove) => {
//     setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && suggestions.length > 0) {
//       addSymptom(suggestions[0]);
//     }
//   };

//   const getPrediction = async () => {
//     if (symptoms.length === 0) {
//       setError('Please add at least one symptom');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://127.0.0.1:5000/prediction/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ symptoms }),
//       });

//       if (!response.ok) {
//         throw new Error('Prediction failed');
//       }

//       const data = await response.json();
//       setPrediction(data);
//     } catch (err) {
//       setError('Failed to get prediction. Please try again.');
//       console.error('Prediction error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fileError) {
//     return (
//       <div className="max-w-2xl mx-auto p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <p>{fileError}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold mb-4">Disease Prediction</h2>
        
//         {/* Input and Tags Container */}
//         <div className="border rounded-lg p-2 mb-4">
//           {/* Selected Symptoms Tags */}
//           <div className="flex flex-wrap gap-2 mb-2">
//             {symptoms.map((symptom) => (
//               <span 
//                 key={symptom}
//                 className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
//               >
//                 {symptom}
//                 <button
//                   onClick={() => removeSymptom(symptom)}
//                   className="hover:text-blue-600"
//                 >
//                   <X size={14} />
//                 </button>
//               </span>
//             ))}
//           </div>

//           {/* Input Field */}
//           <input
//             type="text"
//             value={inputValue}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Type symptom..."
//             className="w-full p-2 outline-none"
//           />
//         </div>

//         {/* Suggestions */}
//         {suggestions.length > 0 && (
//           <div className="border rounded-lg mt-1 shadow-lg">
//             {suggestions.map((suggestion) => (
//               <button
//                 key={suggestion}
//                 onClick={() => addSymptom(suggestion)}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 {suggestion}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* Predict Button */}
//         <button
//           onClick={getPrediction}
//           disabled={loading || symptoms.length === 0}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 mt-4"
//         >
//           {loading ? 'Predicting...' : 'Predict Disease'}
//         </button>

//         {/* Error Message */}
//         {error && (
//           <div className="mt-4 text-red-600">
//             {error}
//           </div>
//         )}

//         {/* Prediction Results */}
//         {prediction && (
//           <div className="mt-6 border rounded-lg p-4">
//             <h3 className="font-bold mb-3">Prediction Results</h3>
//             <div className="space-y-2">
//               <p><span className="font-semibold">Final Prediction:</span> {prediction.final_prediction}</p>
//               <div className="border-t pt-2">
//                 <p className="font-semibold mb-1">Individual Model Predictions:</p>
//                 <ul className="space-y-1">
//                   <li>Random Forest: {prediction.rf_prediction} ({(prediction.confidence_scores.rf * 100).toFixed(1)}% confidence)</li>
//                   <li>Naive Bayes: {prediction.nb_prediction} ({(prediction.confidence_scores.nb * 100).toFixed(1)}% confidence)</li>
//                   <li>SVM: {prediction.svm_prediction} ({(prediction.confidence_scores.svm * 100).toFixed(1)}% confidence)</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SymptomPredictor;

//////////////////////////
//////////////////////////////////////////////////////////////////////// ensemble model //////////////////////////
////////////////////////

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const SymptomPredictor = () => {
  const [inputValue, setInputValue] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    const loadSymptoms = async () => {
      try {
        const response = await fetch('/symptoms.txt');
        if (!response.ok) {
          throw new Error('Failed to load symptoms file');
        }
        const text = await response.text();
        const symptoms = text.split('\n')
          .map(symptom => symptom.trim())
          .filter(symptom => symptom.length > 0)
          .sort();
        
        setAllSymptoms(symptoms);
      } catch (err) {
        console.error('Error loading symptoms:', err);
        setFileError('Failed to load symptoms list. Please try again later.');
      }
    };

    loadSymptoms();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      const filtered = allSymptoms.filter(symptom => {
        const searchTerms = value.toLowerCase().split(' ');
        return searchTerms.every(term => 
          symptom.toLowerCase().includes(term) && 
          !symptoms.includes(symptom)
        );
      }).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSymptom = (symptom) => {
    if (!symptoms.includes(symptom) && symptoms.length < 10) {
      setSymptoms([...symptoms, symptom]);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
    setPrediction(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      e.preventDefault();
      addSymptom(suggestions[0]);
    }
  };

  const getPrediction = async () => {
    if (symptoms.length === 0) {
      setError('Please add at least one symptom');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/prediction/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError('Failed to get prediction. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderConfidenceBar = (confidence) => {
    const percentage = (confidence * 100).toFixed(1);
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  if (fileError) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {fileError}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Disease Prediction</h2>
        
        <div className="border rounded-lg p-2 mb-4 bg-white shadow-sm">
          <div className="flex flex-wrap gap-2 mb-2">
            {symptoms.map((symptom) => (
              <span 
                key={symptom}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1 text-sm"
              >
                {symptom}
                <button
                  onClick={() => removeSymptom(symptom)}
                  className="hover:text-blue-600 focus:outline-none"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={symptoms.length >= 10 ? "Maximum symptoms reached" : "Type symptom..."}
            className="w-full p-2 outline-none"
            disabled={symptoms.length >= 10}
          />
        </div>

        {suggestions.length > 0 && (
          <div className="border rounded-lg mt-1 shadow-lg bg-white">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addSymptom(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={getPrediction}
          disabled={loading || symptoms.length === 0}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 mt-4 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Predicting...
            </>
          ) : 'Predict Disease'}
        </button>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {prediction && (
          <div className="mt-6 border rounded-lg p-4 bg-white shadow">
            <h3 className="font-bold mb-3">Prediction Results</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold text-lg text-blue-800">
                  Final Prediction: {prediction.final_prediction}
                </p>
              </div>
              
              <div className="border-t pt-3">
                <p className="font-semibold mb-2">Individual Model Predictions:</p>
                <div className="space-y-3">
                  {[
                    { name: 'Random Forest', key: 'rf' },
                    { name: 'Naive Bayes', key: 'nb' },
                    { name: 'SVM', key: 'svm' }
                  ].map(model => (
                    <div key={model.key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{model.name}:</span>
                        <span>{(prediction.confidence_scores[model.key] * 100).toFixed(1)}%</span>
                      </div>
                      {renderConfidenceBar(prediction.confidence_scores[model.key])}
                      <p className="text-sm text-gray-600">
                        Prediction: {prediction[`${model.key}_prediction`]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomPredictor;

///////////////////
////////////////////////////////////////////////////////////////////// dl front end //////////////////////////
//////////////////


// import { useState, useEffect } from 'react';
// import { X } from 'lucide-react';

// const SymptomPredictor = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [symptoms, setSymptoms] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [allSymptoms, setAllSymptoms] = useState([]);
//   const [fileError, setFileError] = useState(null);
//   const [modelType, setModelType] = useState(null);

//   useEffect(() => {
//     const loadSymptoms = async () => {
//       try {
//         const response = await fetch('/symptoms.txt');
//         if (!response.ok) {
//           throw new Error('Failed to load symptoms file');
//         }
//         const text = await response.text();
//         const symptoms = text.split('\n')
//           .map(symptom => symptom.trim())
//           .filter(symptom => symptom.length > 0)
//           .sort();
        
//         setAllSymptoms(symptoms);
//       } catch (err) {
//         console.error('Error loading symptoms:', err);
//         setFileError('Failed to load symptoms list. Please try again later.');
//       }
//     };

//     loadSymptoms();
//   }, []);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);
    
//     if (value.trim()) {
//       const filtered = allSymptoms.filter(symptom => {
//         const searchTerms = value.toLowerCase().split(' ');
//         return searchTerms.every(term => 
//           symptom.toLowerCase().includes(term) && 
//           !symptoms.includes(symptom)
//         );
//       }).slice(0, 5);
//       setSuggestions(filtered);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const addSymptom = (symptom) => {
//     if (!symptoms.includes(symptom) && symptoms.length < 10) {
//       setSymptoms([...symptoms, symptom]);
//       setInputValue('');
//       setSuggestions([]);
//     }
//   };

//   const removeSymptom = (symptomToRemove) => {
//     setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
//     setPrediction(null);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && suggestions.length > 0) {
//       e.preventDefault();
//       addSymptom(suggestions[0]);
//     }
//   };

//   const getPrediction = async () => {
//     if (symptoms.length === 0) {
//       setError('Please add at least one symptom');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('http://127.0.0.1:5000/prediction/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ symptoms }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setPrediction(data);
      
//       // Determine model type based on response structure
//       if (data.confidence_scores.hasOwnProperty('hybrid')) {
//         setModelType('hybrid');
//       } else if (data.confidence_scores.hasOwnProperty('dnn')) {
//         setModelType('dnn');
//       } else {
//         setModelType('traditional');
//       }
      
//     } catch (err) {
//       setError('Failed to get prediction. Please try again.');
//       console.error('Prediction error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderConfidenceBar = (confidence) => {
//     const percentage = (confidence * 100).toFixed(1);
//     return (
//       <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
//         <div 
//           className="bg-blue-600 h-2.5 rounded-full" 
//           style={{ width: `${percentage}%` }}
//         />
//       </div>
//     );
//   };

//   // Function to get model name display based on key
//   const getModelName = (key) => {
//     const modelNames = {
//       'rf': 'Random Forest',
//       'gb': 'Gradient Boosting',
//       'svm': 'SVM',
//       'nb': 'Naive Bayes',
//       'dnn': 'Deep Neural Network',
//       'hybrid': 'Hybrid Model'
//     };
//     return modelNames[key] || key.toUpperCase();
//   };

//   if (fileError) {
//     return (
//       <div className="max-w-2xl mx-auto p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {fileError}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold mb-4">Disease Prediction</h2>
        
//         <div className="border rounded-lg p-2 mb-4 bg-white shadow-sm">
//           <div className="flex flex-wrap gap-2 mb-2">
//             {symptoms.map((symptom) => (
//               <span 
//                 key={symptom}
//                 className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1 text-sm"
//               >
//                 {symptom}
//                 <button
//                   onClick={() => removeSymptom(symptom)}
//                   className="hover:text-blue-600 focus:outline-none"
//                 >
//                   <X size={14} />
//                 </button>
//               </span>
//             ))}
//           </div>

//           <input
//             type="text"
//             value={inputValue}
//             onChange={handleInputChange}
//             onKeyDown={handleKeyDown}
//             placeholder={symptoms.length >= 10 ? "Maximum symptoms reached" : "Type symptom..."}
//             className="w-full p-2 outline-none"
//             disabled={symptoms.length >= 10}
//           />
//         </div>

//         {suggestions.length > 0 && (
//           <div className="border rounded-lg mt-1 shadow-lg bg-white">
//             {suggestions.map((suggestion) => (
//               <button
//                 key={suggestion}
//                 onClick={() => addSymptom(suggestion)}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
//               >
//                 {suggestion}
//               </button>
//             ))}
//           </div>
//         )}

//         <button
//           onClick={getPrediction}
//           disabled={loading || symptoms.length === 0}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 mt-4 flex items-center justify-center gap-2"
//         >
//           {loading ? (
//             <>
//               <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//               </svg>
//               Predicting...
//             </>
//           ) : 'Predict Disease'}
//         </button>

//         {error && (
//           <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}

//         {prediction && (
//           <div className="mt-6 border rounded-lg p-4 bg-white shadow">
//             <h3 className="font-bold mb-3">Prediction Results</h3>
//             <div className="space-y-4">
//               <div className="bg-blue-50 p-3 rounded-lg">
//                 <p className="font-semibold text-lg text-blue-800">
//                   Final Prediction: {prediction.final_prediction}
//                 </p>
//               </div>
              
//               <div className="border-t pt-3">
//                 <p className="font-semibold mb-2">Model Predictions:</p>
//                 <div className="space-y-3">
//                   {/* Dynamic rendering based on model type */}
//                   {Object.entries(prediction.confidence_scores).map(([key, value]) => (
//                     <div key={key}>
//                       <div className="flex justify-between text-sm mb-1">
//                         <span>{getModelName(key)}:</span>
//                         <span>{(value * 100).toFixed(1)}%</span>
//                       </div>
//                       {renderConfidenceBar(value)}
//                       {(key !== 'hybrid' && key !== 'dnn' && prediction[`${key}_prediction`]) && (
//                         <p className="text-sm text-gray-600">
//                           Prediction: {prediction[`${key}_prediction`]}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               {modelType === 'hybrid' && (
//                 <div className="bg-blue-50 p-3 rounded-lg text-sm">
//                   <p className="font-semibold mb-1">Model Info:</p>
//                   <p>Using Hybrid Deep Learning model which combines Neural Networks with traditional ML algorithms</p>
//                 </div>
//               )}
              
//               {modelType === 'dnn' && (
//                 <div className="bg-blue-50 p-3 rounded-lg text-sm">
//                   <p className="font-semibold mb-1">Model Info:</p>
//                   <p>Using Deep Neural Network model</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SymptomPredictor;