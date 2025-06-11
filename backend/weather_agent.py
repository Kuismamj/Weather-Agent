# backend.py
from flask import Flask, jsonify, request
import requests
from langchain_ollama import OllamaLLM
from langchain.prompts import PromptTemplate
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route("/")  # tämä vastaa http://127.0.0.1:5000/
def home():
    return "Sääagentti backend toimii!"


def get_weather(latitude=60.1699, longitude=24.9384):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current_weather": True,
    }
    response = requests.get(url, params=params)
    data = response.json()
    temp = data["current_weather"]["temperature"]
    code = data["current_weather"]["weathercode"]
    return temp, code

def condition_to_text(code):
    mapping = {
        0: "clear",
        1: "mainly clear",
        2: "partly cloudy",
        3: "overcast",
        45: "foggy",
        51: "light rain",
        61: "rainy",
        80: "thunderstorm",
    }
    return mapping.get(code, "unusual weather")

template = PromptTemplate.from_template(
    "The current temperature is {temp}°C and the weather is {condition}. What should I wear?"
)

llm = OllamaLLM(model="mistral")
chain = template | llm

@app.route("/api/weather")
def weather():
    lat = request.args.get("lat", default=60.1699, type=float)
    lon = request.args.get("lon", default=24.9384, type=float)
    temp, code = get_weather(lat, lon)
    condition = condition_to_text(code)
    result = chain.invoke({"temp": temp, "condition": condition})
    return jsonify({
        "temperature": temp,
        "condition": condition,
        "recommendation": result
    })

if __name__ == "__main__":
    import os
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
    
