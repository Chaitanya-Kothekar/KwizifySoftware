
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentconteoller');

// Route for creating a new student
router.post('/create', studentController.createStudent);
router.get('/get', studentController.getStudents);
router.get('/getByClass', studentController.getStudentsByClassName);
router.put('/:id', studentController.updateStudent);
router.delete('/:id',studentController. deleteStudent);
router.get('/students/classname/:className', studentController.getStudentsByClassName);

module.exports = router;