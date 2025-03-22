import { useState, useEffect, useContext } from 'react';
import { X } from 'lucide-react';
import { LifeLine } from 'react-loading-indicators';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const SymptomPredictor = ({ onPredictionResult }) => {
  const [inputValue, setInputValue] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const [fileError, setFileError] = useState(null);
  
  // Get authentication context
  const { user, isAuthenticated } = useContext(AuthContext);

  // Load symptoms from file
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
          .filter(symptom => symptom.length > 0);
        
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
      const filtered = allSymptoms.filter(
        symptom => 
          symptom.toLowerCase().includes(value.toLowerCase()) && 
          !symptoms.includes(symptom)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSymptom = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
      setInputValue('');
      setSuggestions([]);
    }
  };

  const removeSymptom = (symptomToRemove) => {
    setSymptoms(symptoms.filter(symptom => symptom !== symptomToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
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
      // Create request payload
      const payload = { symptoms };
      
      // Add user_id to payload if user is authenticated
      if (isAuthenticated && user && user._id) {
        payload.user_id = user._id;
        console.log('Adding user_id to payload:', user._id);
      }

      // Get token from localStorage
      const token = localStorage.getItem('token');

      console.log('Sending prediction request with payload:', payload);
      console.log('Authentication status:', isAuthenticated, 'Token exists:', !!token);
      
      const response = await fetch('http://127.0.0.1:5000/prediction/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if available
          ...(token && {
            'Authorization': `Bearer ${token}`
          })
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`Prediction failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Prediction API response:', data);
      
      // Update local state with prediction data
      setPrediction(data);
      
      // Pass the prediction data to parent component for history tracking
      if (onPredictionResult && typeof onPredictionResult === 'function') {
        console.log('Passing prediction to parent component:', data);
        onPredictionResult(data);
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError(`Failed to get prediction: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (fileError) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{fileError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 relative">
      <div className={`mb-6 transition-all duration-300 ${loading ? 'blur-md' : ''}`}>
        <h2 className="text-2xl font-bold mb-4">Enter Symptoms</h2>

        {/* Input and Tags Container */}
        <div className="border rounded-lg p-2 mb-4">
          {/* Selected Symptoms Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {symptoms.map((symptom) => (
              <span 
                key={symptom}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
              >
                {symptom}
                <button
                  onClick={() => removeSymptom(symptom)}
                  className="hover:text-blue-600"
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type symptom..."
            className="w-full p-2 outline-none"
          />
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="border rounded-lg mt-1 shadow-lg">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addSymptom(suggestion)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 mb-1 rounded"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Login Prompt for Guest Users */}
        {!isAuthenticated && (
          <div className="mb-4 text-sm text-gray-600 border-l-4 border-blue-500 pl-3 py-2 bg-blue-50">
            <p>Sign in to save your prediction history.</p>
          </div>
        )}

        {/* Predict Button */}
        <button
          onClick={getPrediction}
          disabled={loading || symptoms.length === 0}
          className="w-full bg-gradient-to-r from-[#ff8c42] to-[#ff3e55] text-white font-bold py-2 px-6 rounded-lg hover:from-[#ff3e55] hover:to-[#ff8c42] transition-all duration-300 hover:scale-105"
        >
          {loading ? 'Predicting...' : 'Predict Disease'}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-red-600">
            {error}
          </div>
        )}

        {/* Prediction Results */}
        {prediction && (
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-bold mb-3">Prediction Results</h3>
            <div className="space-y-2">
              <p><span className="font-semibold">Final Prediction:</span> {prediction.final_prediction}</p>
              {prediction.saved_to_history && (
                <p className="text-green-600 text-xs">✓ This prediction has been saved to your history</p>
              )}
              <div className="border-t pt-2">
                <p className="font-semibold mb-1">Individual Model Predictions:</p>
                <ul className="space-y-1">
                  <li>Random Forest: {prediction.rf_prediction} ({(prediction.confidence_scores.rf * 100).toFixed(1)}% confidence)</li>
                  <li>Naive Bayes: {prediction.nb_prediction} ({(prediction.confidence_scores.nb * 100).toFixed(1)}% confidence)</li>
                  <li>SVM: {prediction.svm_prediction} ({(prediction.confidence_scores.svm * 100).toFixed(1)}% confidence)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading Effect - LifeLine Loader from react-loading-indicators */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-lg">
          <LifeLine color="#ffffff" size="medium" text="Predicting" textColor="" speedPlus="-2"/>
        </div>
      )}
    </div>
  );
};

export default SymptomPredictor;