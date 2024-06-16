// routes/subjectRoutes.js
const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

router.post("/create", subjectController.createSubject);
router.get("/get", subjectController.getSubjects);
router.delete('/:id', subjectController.deleteSubject);
router.put('/:id', subjectController.updateSubject);


module.exports = router;


