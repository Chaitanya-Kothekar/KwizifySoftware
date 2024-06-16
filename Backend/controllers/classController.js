// controllers/classController.js
const Class = require("../models/class");
const ClassSubjectMapping = require('../models/classSubjectMapping');

exports.createClass = async (req, res) => {
  try {
    const { className, roomNumber } = req.body;
    const classObj = new Class({ className, roomNumber });
    const savedClass = await classObj.save();
    res.json({
      message: "Class created successfully",
      data: savedClass,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to delete class with id: ${id}`);

    // Check if the class exists
    const classToDelete = await Class.findById(id);
    if (!classToDelete) {
      console.log(`Class with id: ${id} not found`);
      return res.status(404).json({ message: 'Class not found' });
    }

    console.log(`Deleting mappings for class with id: ${classToDelete._id}`);
    await ClassSubjectMapping.deleteMany({ classId: classToDelete._id });

    console.log(`Deleting class with id: ${classToDelete._id}`);
    await Class.findByIdAndDelete(classToDelete._id);

    console.log('Class and related mappings deleted successfully');
    res.status(200).json({ message: 'Class and related mappings deleted successfully' });
  } catch (error) {
    console.error('Error in deleteClass:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// exports.updateClass = async (req, res) => {
//   try {
//     const updatedClass = await Class.findByIdAndUpdate(
//       req.params.id,
//       { name: req.body.name, description: req.body.description },
//       { new: true }
//     );
//     if (!updatedClass) {
//       return res.status(404).json({ message: 'Class not found' });
//     }
//     res.json(updatedClass);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateClass = async (req, res) => {
  console.log('data ',req.params.id);
  console.log('data ',req.body);
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'error.message' });
  }
};