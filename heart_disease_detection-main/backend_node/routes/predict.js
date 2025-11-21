const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

const FEATURE_NAMES = [
  'male',
  'age',
  'currentSmoker',
  'cigsPerDay',
  'BPMeds',
  'prevalentStroke',
  'prevalentHyp',
  'diabetes',
  'totChol',
  'sysBP',
  'diaBP',
  'BMI',
  'heartRate',
  'glucose',
];

const MODEL_PATH =
  process.env.MODEL_PATH ||
  path.join(__dirname, '..', 'models', 'finalized_model.sav');

const modelExists = fs.existsSync(MODEL_PATH);

router.post('/', (req, res) => {
  const missingFields = FEATURE_NAMES.filter(
    (feature) => typeof req.body[feature] === 'undefined'
  );

  if (missingFields.length) {
    return res.status(400).json({
      error: 'Missing required feature(s)',
      missingFields,
    });
  }

  if (!modelExists) {
    console.warn(
      'No finalized_model.sav detected. Returning dummy prediction. See TODO in routes/predict.js.'
    );
  }

  const prediction = dummyPredict(req.body);

  res.json({
    prediction,
    modelSource: modelExists ? 'temporary-placeholder-model' : 'dummy-model',
    note:
      'TODO: Replace dummyPredict with real model inference once a Node-compatible model or service is available.',
  });
});

function dummyPredict(features) {
  const riskContributors = [
    features.age > 55 ? 1 : 0,
    features.currentSmoker ? 1 : 0,
    features.cigsPerDay > 10 ? 1 : 0,
    features.prevalentStroke ? 1 : 0,
    features.prevalentHyp ? 1 : 0,
    features.diabetes ? 1 : 0,
    features.totChol > 250 ? 1 : 0,
    features.sysBP > 140 ? 1 : 0,
    features.diaBP > 90 ? 1 : 0,
    features.BMI > 30 ? 1 : 0,
    features.heartRate > 100 ? 1 : 0,
    features.glucose > 140 ? 1 : 0,
  ];

  const score = riskContributors.reduce((sum, value) => sum + value, 0);
  return score >= 3 ? 1 : 0;
}

module.exports = router;

