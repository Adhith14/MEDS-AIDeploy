from flask import Blueprint, request, jsonify
from services.predictor import predict_disease

# Create a Blueprint for prediction-related routes
prediction_bp = Blueprint("prediction", __name__)

@prediction_bp.route("/predict", methods=["POST", "GET"])
def predict():
    try:
        input_json = request.get_json()
        response = predict_disease(input_json)  # Calls the service function
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)})
