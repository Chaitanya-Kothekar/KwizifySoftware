const StudentMarks = require("../models/scoreModel");

const createStudentMarks = async (req, res) => {
  try {
    const studentMarksArray = req.body;

    if (!Array.isArray(studentMarksArray)) {
      return res
        .status(400)
        .json({ message: "Input should be an array of objects" });
    }

    const savedRecords = [];
    for (const studentMarksData of studentMarksArray) {
      const newStudentMarks = new StudentMarks({
        ClassId: studentMarksData.ClassId,
        StudentId: studentMarksData.StudentId,
        SubjectId: studentMarksData.SubjectId,
        marks: studentMarksData.marks,
      });

      const savedRecord = await newStudentMarks.save();
      savedRecords.push(savedRecord);
    }

    res.status(201).json(savedRecords);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllStudentMarks = async (req, res) => {
  try {
    const records = await StudentMarks.find()
      .populate("ClassId")
      .populate("StudentId")
      .populate("SubjectId");
    console.log(records);
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStudentMarksByClassId = async (req, res) => {
  try {
    const records = await StudentMarks.find({ ClassId: req.params.classId })
      .populate("ClassId")
      .populate("StudentId")
      .populate("SubjectId");
    if (records.length === 0) {
      return res.status(200).json([]); // Send an empty array if no records are found
    }
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStudentMarks = async (req, res) => {
  try {
    const { StudentId, SubjectId } = req.params;
    const { marks } = req.body;

    const updatedRecord = await StudentMarks.findOneAndUpdate(
      { StudentId, SubjectId },
      { $set: { marks } },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(updatedRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createStudentMarks,
  getAllStudentMarks,
  getStudentMarksByClassId,
  updateStudentMarks,
};
