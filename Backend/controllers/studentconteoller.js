
const Student = require('../models/student');

// Create a new student
exports.createStudent = async (req, res) => {
    const { name, className } = req.body;

    if (!name || !className) {
        return res.status(400).json({ message: 'Name and class name are required.' });
    }

    try {
        const newStudent = new Student({ name, className });
        await newStudent.save();
        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
};

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error: error.message });
    }
};

// Update student
exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, className } = req.body;

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        student.name = name;
        student.className = className;

        await student.save();

        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
};

// Delete student
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
};

// Get students grouped by class name
exports.getStudentsByClassGroup = async (req, res) => {
    try {
        const students = await Student.find();

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }

        const classMap = students.reduce((acc, student) => {
            if (!acc[student.className]) {
                acc[student.className] = [];
            }
            acc[student.className].push(student.name);
            return acc;
        }, {});

        const result = Object.keys(classMap).map(className => ({
            className,
            students: classMap[className]
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error: error.message });
    }
};


// Get students by class name
exports.getStudentsByClassName = async (req, res) => {
    const { className } = req.params;

    try {
      const students = await Student.find({ className });

      // if (students.length === 0) {
      //     return res.status(404).json({ message: 'No students found for this class name' });
      // }

      // res.status(200).json(students);
      if (students.length === 0) {
        return res.status(204).send(); // Return 204 status code if no records are found
      }
      res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error: error.message });
    }
};
