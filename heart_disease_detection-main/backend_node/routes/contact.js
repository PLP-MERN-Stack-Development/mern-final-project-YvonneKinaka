const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

const submissionsPath = path.join(
  __dirname,
  '..',
  'data',
  'contact-submissions.json'
);

function persistSubmission(entry) {
  fs.mkdirSync(path.dirname(submissionsPath), { recursive: true });

  let existing = [];
  if (fs.existsSync(submissionsPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(submissionsPath, 'utf-8'));
    } catch (error) {
      console.warn('Unable to parse contact submissions file:', error);
    }
  }

  existing.push(entry);
  fs.writeFileSync(submissionsPath, JSON.stringify(existing, null, 2));
}

router.post('/', (req, res) => {
  const { name, phone, message } = req.body || {};

  if (!name || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: 'name, phone, and message are required',
    });
  }

  const entry = {
    name,
    phone,
    message,
    timestamp: new Date().toISOString(),
  };

  try {
    persistSubmission(entry);
  } catch (error) {
    console.error('Failed to persist contact submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Could not save your message. Please try again later.',
    });
  }

  return res.json({
    success: true,
    message:
      'Thanks for reaching out! We received your message and will respond soon.',
  });
});

module.exports = router;

