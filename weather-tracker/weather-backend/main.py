from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
import requests
import firebase_admin
from firebase_admin import auth, credentials
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

# Initialize Firebase with environment variables
firebase_creds = {
    "type": "service_account",
    "project_id": os.getenv("FIREBASE_PROJECT_ID"),
    "private_key_id": os.getenv("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": os.getenv("FIREBASE_PRIVATE_KEY").replace("\\n", "\n") if os.getenv("FIREBASE_PRIVATE_KEY") else None,
    "client_email": os.getenv("FIREBASE_CLIENT_EMAIL"),
    "client_id": os.getenv("FIREBASE_CLIENT_ID"),
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": os.getenv("FIREBASE_CLIENT_CERT_URL")
}

# Check if required Firebase credentials are present
required_fields = ["project_id", "private_key", "client_email"]
missing_fields = [field for field in required_fields if not firebase_creds.get(field)]
if missing_fields:
    raise RuntimeError(f"Missing required Firebase credentials: {', '.join(missing_fields)}")

cred = credentials.Certificate(firebase_creds)
firebase_admin.initialize_app(cred)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Weather API Key
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
if not WEATHER_API_KEY:
    raise RuntimeError("Missing WEATHER_API_KEY. Check your .env file.")

def verify_token(authorization: str = Header(None)):
    """ Verifies the Firebase ID token """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid or missing authentication token")

    token = authorization.replace("Bearer ", "")

    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid authentication token")

@app.get("/weather")
def get_weather(cities: str, user_data: dict = Depends(verify_token)):
    """ Fetches weather data for a list of cities """
    city_list = [city.strip() for city in cities.split(",")]
    weather_data = []

    for city in city_list:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&units=metric"
        response = requests.get(url)
        
        if response.status_code == 200:
            weather_data.append(response.json())
        else:
            weather_data.append({"city": city, "error": "Could not fetch data"})

    return weather_data