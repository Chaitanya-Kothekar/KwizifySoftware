// models/Subject.js
const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Subject", subjectSchema);


