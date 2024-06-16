// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const studentMarksSchema = new Schema(
//   {
//     ClassId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Class",
//     },
//     StudentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Student",
//     },
//     SubjectId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "Subject",
//     },
//     marks: {
//       type: Number,
//       required: true,
//       default: -1,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const StudentMarks = mongoose.model("StudentMarks", studentMarksSchema);

// module.exports = StudentMarks;

const mongoose = require("mongoose");

const studentMarksSchema = new mongoose.Schema({
  ClassId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  StudentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  SubjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  marks: Number,
});

module.exports = mongoose.model("StudentMarks", studentMarksSchema);
