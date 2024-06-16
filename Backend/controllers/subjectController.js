// controllers/subjectController.js
const Subject = require("../models/subjects");
const ClassSubjectMapping = require('../models/classSubjectMapping');

exports.createSubject = async (req, res) => {
  try {
    const { subjectName, description } = req.body;
    const subject = new Subject({ subjectName, description });
    const savedSubject = await subject.save();
    res.json({
      message: "Subject created successfully",
      data: savedSubject,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;

    // Check if the subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Delete the subject
    await Subject.findByIdAndDelete(subjectId);

    // Delete the subject from all mappings (ClassSubjectMapping)
    await ClassSubjectMapping.deleteMany({ subjectId: subjectId });

    res.json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateSubject = async (req, res) => {
  try {
    const { subjectName, description } = req.body;
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    subject.subjectName = subjectName;
    subject.description = description;

    const updatedSubject = await subject.save();
    res.json({
      message: "Subject updated successfully",
      data: updatedSubject,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



