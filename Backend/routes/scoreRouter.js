const express = require("express");
const router = express.Router();
const {
  createStudentMarks,
  getAllStudentMarks,
  getStudentMarksByClassId,
  updateStudentMarks,
} = require("../controllers/scoreController");

// Route to create a new student marks record
router.post("/add", createStudentMarks);

// Route to get all student marks records
router.get("/all", getAllStudentMarks);

// Route to get student marks records by ClassId
router.get("/class/:classId", getStudentMarksByClassId);

// Route to update student marks record by StudentId and SubjectId
router.put("/studentId/:SubjectId", updateStudentMarks);

module.exports = router;

