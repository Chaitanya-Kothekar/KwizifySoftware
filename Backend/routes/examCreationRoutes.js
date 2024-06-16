// routes/examRoutes.js
const express = require('express');
const router = express.Router();
const examController = require('../controllers/examCreationController');

// POST request to create a new exam
router.post('/exams', examController.createExam);

router.get('/exams', examController.getExams);

router.put('/exams/:id', examController.updateExam);

router.delete('/exams/:id', examController.deleteExam);

module.exports = router;
