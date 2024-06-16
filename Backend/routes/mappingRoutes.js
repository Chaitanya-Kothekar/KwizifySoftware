const express = require('express');
const router = express.Router();
const { mapSubjectToClass , getClassSubjectMapping ,getClassSubjectMappingByClassId} = require('../controllers/mappingController');


router.post('/map', mapSubjectToClass);
router.get('/getMap', getClassSubjectMapping);
router.get('/getMap/:className', getClassSubjectMappingByClassId);


module.exports = router;

