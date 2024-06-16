// controllers/examController.js
const Exam = require("../models/examCreationModel");

exports.createExam = async (req, res) => {
    try {
        
        const { academicYear, examTerm, startTime, endTime, title, duration, numberOfQuestions, totalMarks, description,date,className,subject } = req.body;

        const newExam = new Exam({
            academicYear,
            examTerm,
            startTime,
            endTime,
            title,
            duration,
            numberOfQuestions,
            totalMarks,
            description,
            date,
            className,
            subject
        });


    await newExam.save();


    res
      .status(201)
      .json({ message: "Exam created successfully", exam: newExam });
  } catch (error) {

    res
      .status(500)
      .json({ message: "Error creating exam", error: error.message });
  }
};

exports.getExams = async (req, res) => {
  try {

    const exams = await Exam.find();


    res.status(200).json(exams);
  } catch (error) {

    res
      .status(500)
      .json({ message: "Error retrieving exams", error: error.message });
  }
};

exports.updateExam = async (req, res) => {
  const { id } = req.params;
  const { academicYear, examTerm, startTime, endTime, title, duration, numberOfQuestions, totalMarks, description, date, className, subject } = req.body;

  try {
      const exam = await Exam.findById(id)
;

      if (!exam) {
          return res.status(404).json({ message: 'Exam not found' });
      }

      exam.academicYear = academicYear;
      exam.examTerm = examTerm;
      exam.startTime = startTime;
      exam.endTime = endTime;
      exam.title = title;
      exam.duration = duration;
      exam.numberOfQuestions = numberOfQuestions;
      exam.totalMarks = totalMarks;
      exam.description = description;
      exam.date = date;
      exam.className = className;
      exam.subject = subject;

      await exam.save();

      res.status(200).json({ message: 'Exam updated successfully', exam });
  } catch (error) {
      res.status(500).json({ message: 'Error updating exam', error: error.message });
  }
};


exports.deleteExam = async (req, res) => {
  const { id } = req.params;

  try {
      const exam = await Exam.findByIdAndDelete(id)
;

      if (!exam) {
          return res.status(404).json({ message: 'Exam not found' });
      }

      res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting exam', error: error.message });
  }
};