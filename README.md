# Weather Agent

**Weather Agent** is a fullstack weather application that shows the current weather based on the user's location and provides a clothing recommendation using AI.

## Technologies

- **Frontend:** Next.js (React, TypeScript, Tailwind CSS)
- **Backend:** Flask (Python), LangChain, Ollama LLM
- **API:** Open-Meteo (weather data)
- **Other:** CORS, Fetch API

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On Linux/macOS
pip install -r requirements.txt
```

### 4. Start the backend

```bash
python weather_agent.py
```

### 5. Start the frontend

```bash
cd ../frontend
npm run dev
```

### 6. Use the app

Open your browser and go to [http://localhost:3000](http://localhost:3000)

---

## Features

- Gets the user's location from the browser
- Shows current weather using the Open-Meteo API
- Generates a clothing recommendation using AI (LLM)
- Stylish UI (Tailwind CSS)
- Dark background image and responsive design

---
Test here: https://weatheragent1.netlify.app/
NOTE: This project’s full functionality does not work on Netlify because the backend relies on a local Large Language Model (LLM, e.g. Ollama) that cannot be hosted on Render or other free cloud platforms. Therefore it "analyzes the weather" endlessly. It should be looking like this https://ibb.co/dhRjm84. 

**Note:**  
If frontend and backend run on different ports, make sure the backend URL is correct in the frontend fetch requests.
