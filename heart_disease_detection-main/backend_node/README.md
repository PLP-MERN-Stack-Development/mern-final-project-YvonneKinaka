# Heart Disease Predictor – Node/Express Backend

Express API that replaces the old FastAPI service so this project can run like a MERN stack.

## Requirements
- Node.js 18+
- npm 9+

## Setup
```bash
cd backend_node
npm install
copy .env.example .env   
```

## Environment
- `PORT` – API port (default `5000`)
- `ALLOWED_ORIGINS` – comma-separated list of allowed frontend origins
- `MODEL_PATH` – path to the serialized model (`finalized_model.sav`) once available

## Scripts
- `npm run dev` – start with nodemon
- `npm start` – start with node

## Endpoints
- `GET /health` – quick status check
- `POST /predict` – accepts the same JSON payload as the React form and replies with `{ prediction: 0 | 1 }`

