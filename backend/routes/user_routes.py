from bson import ObjectId
from flask import Blueprint, request, jsonify
from services.user_service import recommend_doctors, predict_disease
from database import mongo

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

@user_bp.route("/doctors/specialty/<int:specialty_id>", methods=["GET"])
def get_doctors_by_specialty(specialty_id):
    try:
        # Find doctors with matching specialty_id (as integer)
        doctors = list(mongo.db.doctors.find({"specialty_id": specialty_id}))
        
        # Convert ObjectId to string for JSON serialization
        for doctor in doctors:
            if isinstance(doctor["_id"], ObjectId):
                doctor["_id"] = str(doctor["_id"])
        
        return jsonify({"doctors": doctors})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@user_bp.route("/doctors", methods=["GET"])
def get_all_doctors():
    """ Retrieves all doctors with specialization & hospital details """
    doctors = mongo.db.doctors.aggregate([
        {
            "$lookup": {
                "from": "specializations",
                "localField": "specialty_id",
                "foreignField": "_id",  # Changed from specialty_id to _id
                "as": "specialization"
            }
        },
        {
            "$lookup": {
                "from": "hospitals",
                "localField": "hospital_id",
                "foreignField": "_id",  # Changed from hospital_id to _id
                "as": "hospital"
            }
        },
        {"$unwind": {"path": "$specialization", "preserveNullAndEmptyArrays": True}},
        {"$unwind": {"path": "$hospital", "preserveNullAndEmptyArrays": True}},
        {
            "$project": {
                "_id": 1,
                "name": 1,
                "email": 1,
                "contact_no": 1,
                "specialization_name": {"$ifNull": ["$specialization.specialty_name", "Unknown"]},
                "hospital_name": {"$ifNull": ["$hospital.name", "Unknown"]},
                "hospital_address": {"$ifNull": ["$hospital.address", "Unknown"]},
                "hospital_city": {"$ifNull": ["$hospital.city", "Unknown"]},
                "hospital_state": {"$ifNull": ["$hospital.state", "Unknown"]},
                "hospital_pin_code": {"$ifNull": ["$hospital.pin_code", "Unknown"]},
                "hospital_contact_no": {"$ifNull": ["$hospital.contact_no", "Unknown"]}
            }
        }
    ])

    return jsonify({"doctors": list(doctors)})

@user_bp.route("/doctors/<int:doctor_id>", methods=["GET"])
def get_doctor_by_id(doctor_id):
    """ Retrieves a single doctor by ID with specialization & hospital details """
    doctor = mongo.db.doctors.aggregate([
        {"$match": {"_id": doctor_id}},  # Match integer ID
        {
            "$lookup": {
                "from": "specializations",
                "localField": "specialty_id",
                "foreignField": "_id",  # Changed from specialty_id to _id
                "as": "specialization"
            }
        },
        {
            "$lookup": {
                "from": "hospitals",
                "localField": "hospital_id",
                "foreignField": "_id",  # Changed from hospital_id to _id
                "as": "hospital"
            }
        },
        {"$unwind": {"path": "$specialization", "preserveNullAndEmptyArrays": True}},
        {"$unwind": {"path": "$hospital", "preserveNullAndEmptyArrays": True}},
        {
            "$project": {
                "_id": 1,
                "name": 1,
                "email": 1,
                "contact_no": 1,
                "specialization_name": {"$ifNull": ["$specialization.specialty_name", "Unknown"]},
                "hospital_name": {"$ifNull": ["$hospital.name", "Unknown"]},
                "hospital_address": {"$ifNull": ["$hospital.address", "Unknown"]},
                "hospital_city": {"$ifNull": ["$hospital.city", "Unknown"]},
                "hospital_state": {"$ifNull": ["$hospital.state", "Unknown"]},
                "hospital_pin_code": {"$ifNull": ["$hospital.pin_code", "Unknown"]},
                "hospital_contact_no": {"$ifNull": ["$hospital.contact_no", "Unknown"]}
            }
        }
    ])

    doctor_data = list(doctor)

    if not doctor_data:
        return jsonify({"error": "Doctor not found"}), 404

    return jsonify({"doctor": doctor_data[0]})

@user_bp.route("/test-doctors", methods=["GET"])
def test_doctors():
    doctors = list(mongo.db.doctors.find({}))
    for doc in doctors:
        doc["_id"] = str(doc["_id"])
    return jsonify(doctors)