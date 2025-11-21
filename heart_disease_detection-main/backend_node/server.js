const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const predictRoutes = require('./routes/predict');
const contactRoutes = require('./routes/contact');

const app = express();

const defaultOrigins = ['http://localhost:5173', 'http://localhost:4173'];
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
  : defaultOrigins;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/predict', predictRoutes);
app.use('/contact', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Heart disease predictor API running on port ${PORT}`);
});

