

const mongoose = require('mongoose');

const classSubjectMappingSchema = new mongoose.Schema({
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  }
});

module.exports = mongoose.model('classSubjectMapping', classSubjectMappingSchema);