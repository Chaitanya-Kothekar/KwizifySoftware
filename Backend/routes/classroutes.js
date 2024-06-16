// routes/classRoutes.js
const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

router.post("/create", classController.createClass);
router.get("/get", classController.getClasses);
router.delete('/delete/:id', classController.deleteClass);
router.put('/update/:id', classController.updateClass);

module.exports = router;
