from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import pickle
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI()

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify your frontend URL instead of "*"
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load the trained model
model = pickle.load(open("finalized_model.sav", "rb"))

# Define the feature names (must match model training)
feature_names = [
    "male", "age", "currentSmoker", "cigsPerDay", "BPMeds", 
    "prevalentStroke", "prevalentHyp", "diabetes", "totChol", 
    "sysBP", "diaBP", "BMI", "heartRate", "glucose"
]

# Define request body schema using Pydantic
class InputData(BaseModel):
    male: int
    age: int
    currentSmoker: int
    cigsPerDay: int
    BPMeds: int
    prevalentStroke: int
    prevalentHyp: int
    diabetes: int
    totChol: float
    sysBP: float
    diaBP: float
    BMI: float
    heartRate: int
    glucose: int

# Define prediction endpoint
@app.post("/predict")
def predict(data: InputData):
    # Convert input data to DataFrame
    input_features = pd.DataFrame([data.dict().values()], columns=feature_names)

    # Make prediction
    prediction = model.predict(input_features)

    # Return the result as JSON
    return {"prediction": int(prediction[0])}
