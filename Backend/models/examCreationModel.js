// models/Exam.js
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    academicYear: { type: String, required: true },
    examTerm: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    numberOfQuestions: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    className: { type: String, required: true },
    subject: { type: String, required: true }
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;