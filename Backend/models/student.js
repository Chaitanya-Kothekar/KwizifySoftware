const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    // other fields as needed
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
