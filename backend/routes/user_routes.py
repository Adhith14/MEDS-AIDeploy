from flask import Blueprint, request, jsonify
from services.user_service import recommend_doctors, predict_disease

user_bp = Blueprint("user", __name__)

@user_bp.route("/recommend-doctors/<disease_id>", methods=["GET"])
def recommend_doctors_api(disease_id):
    doctors = recommend_doctors(disease_id)
    return jsonify(doctors), 200

@user_bp.route("/predict-disease", methods=["POST"])
def predict_disease_api():
    data = request.json
    symptoms = data.get("symptoms", [])

    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    prediction = predict_disease(symptoms)
    return jsonify(prediction), 200
