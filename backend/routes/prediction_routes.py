import datetime
from bson import ObjectId
from flask import Blueprint, current_app, request, jsonify
from services.predictor import predict_disease
from services.chatbot_predictor import get_conversation_summary, process_message, start_chat  # New chatbot logic
from database import mongo


# Create a Blueprint for prediction-related routes
prediction_bp = Blueprint("prediction", __name__)

@prediction_bp.route("/predict", methods=["POST"])
def predict():
    try:
        input_json = request.get_json()
        if not input_json:
            return jsonify({"error": "No data provided"}), 400

        user_id = input_json.get("user_id")
        symptoms = input_json.get("symptoms", [])

        # Call prediction function
        prediction_response = predict_disease({"symptoms": symptoms})

        # Debugging logs
        print("Prediction Response:", prediction_response)

        disease_name = prediction_response.get("final_prediction")
        
        if not disease_name:
            return jsonify({"error": "Prediction failed, no disease detected"}), 500

        # Fetch disease details from the database
        disease_doc = mongo.db.diseases.find_one({"name": disease_name})

        if disease_doc:
            prediction_response["disease_id"] = str(disease_doc["_id"])
            prediction_response["specialty_id"] = str(disease_doc["specialty_id"])
        else:
            prediction_response["disease_id"] = None
            prediction_response["specialty_id"] = None
            prediction_response["id_error"] = f"Disease '{disease_name}' not found in database"

        # Store prediction in database if user is authenticated
        if user_id and disease_doc:
            try:
                prediction_record = {
                    "user_id": ObjectId(user_id) if ObjectId.is_valid(user_id) else user_id,
                    "symptoms": symptoms,
                    "disease_id": disease_doc["_id"],
                    "disease_name": disease_name,
                    "specialty_id": disease_doc["specialty_id"],
                    "final_prediction": disease_name,  # ✅ Ensuring this is stored
                    "confidence_scores": prediction_response.get("confidence_scores", {}),
                    "rf_prediction": prediction_response.get("rf_prediction"),
                    "nb_prediction": prediction_response.get("nb_prediction"),
                    "svm_prediction": prediction_response.get("svm_prediction"),
                    "created_at": datetime.datetime.utcnow()
                }

                result = mongo.db.previous_predictions.insert_one(prediction_record)
                if result.inserted_id:
                    prediction_response["saved_to_history"] = True
            except Exception as e:
                print("Database Insertion Error:", str(e))
                prediction_response["db_error"] = str(e)
                prediction_response["saved_to_history"] = False

        return jsonify(prediction_response)

    except Exception as e:
        print("Server Error:", str(e))
        return jsonify({"error": str(e)}), 500
        
    except Exception as e:
        current_app.logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": str(e)}), 500
 # New routes for chatbot   
@prediction_bp.route("/start_chat", methods=["POST"])
def start_chat_route():
    """Route to start a new chat session"""
    data = request.get_json()
    session_id = data.get("session_id")
    
    if not session_id:
        return jsonify({"error": "No session ID provided"}), 400
    
    response = start_chat(session_id)
    return jsonify(response)

@prediction_bp.route("/process_message", methods=["POST"])
def process_message_route():
    """Route to process a user message and generate a response"""
    data = request.get_json()
    session_id = data.get("session_id")
    user_message = data.get("user_message")
    
    if not session_id:
        return jsonify({"error": "No session ID provided"}), 400
    
    if not user_message:
        return jsonify({"error": "No user message provided"}), 400
    
    response = process_message(session_id, user_message)
    return jsonify(response)

@prediction_bp.route("/get_summary", methods=["POST"])
def get_summary_route():
    """Route to get a summary of the conversation and diagnosis"""
    data = request.get_json()
    session_id = data.get("session_id")
    
    if not session_id:
        return jsonify({"error": "No session ID provided"}), 400
    
    summary = get_conversation_summary(session_id)
    return jsonify(summary)