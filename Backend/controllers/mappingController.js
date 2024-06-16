const Class = require('../models/class');
const Subject = require('../models/subjects');
const ClassSubjectMapping = require('../models/classSubjectMapping');

const mapSubjectToClass = async (req, res) => {
  try {
    const { className, subjectNames } = req.body;
    console.log('Request Body:', req.body);

    // Find the class by name
    const classData = await Class.findOne({ className });
    if (!classData) {
      console.log('Class not found');
      return res.status(400).json({ message: 'Class not found' }); // Changed status to 400 (Bad Request)
    }

    // Find the subjects by names
    const subjectData = await Subject.find({ subjectName: { $in: subjectNames } });
    if (subjectData.length !== subjectNames.length) {
      console.log('One or more subjects not found');
      return res.status(400).json({ message: 'One or more subjects not found' }); // Changed status to 400 (Bad Request)
    }

    // Create an array of subjectIds
    const subjectIds = subjectData.map(subject => subject._id);

    // Check for existing mappings to avoid duplicates
    for (const subjectId of subjectIds) {
      const existingMapping = await ClassSubjectMapping.findOne({ classId: classData._id, subjectId });
      if (existingMapping) {
        continue;
      }

      // Create and save the class-subject mapping
      const newMapping = new ClassSubjectMapping({
        classId: classData._id,
        subjectId: subjectId
      });
      await newMapping.save();
    }

    console.log('Subjects successfully mapped to class');

    res.json({
      message: 'Subjects mapped to class successfully'
    });
  } catch (error) {
    console.error('Error in mapSubjectToClass:', error.message);
    res.status(500).send(error.message);
  }
};


const getClassSubjectMapping = async (req, res) => {
  try {
    const classSubjectMap = await ClassSubjectMapping
      .find()
      .populate('classId', 'className')
      .populate('subjectId', 'subjectName');

    if (!classSubjectMap || classSubjectMap.length === 0) {
      console.log('No mappings found');
      return res.json([]);
    }

    let formattedData = [];

    for (let index = 0; index < classSubjectMap.length; index++) {
      const classSubjtMapData = classSubjectMap[index];
      const findIndex = formattedData.findIndex((data)=>data?.class?._id == classSubjtMapData?.classId?._id)

      if (findIndex >= 0) {
        formattedData[findIndex].subjectsArr.push(classSubjtMapData.subjectId);
      } else {
        formattedData.push({ class: classSubjtMapData.classId, subjectsArr: [classSubjtMapData.subjectId] });
      }
    }

    return res.json(formattedData);
  } catch (error) {
    console.error('Error in getClassSubjectMapping:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const filterClassSubjects = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const result = {
    className: data[0].classId.className,
    subjects: data.map(item => ({
      subjectName: item.subjectId.subjectName,
      subjectId: item.subjectId._id
    }))
  };

  return result;
};

const getClassSubjectMappingByClassId = async (req, res) => {
  try {
    const { className } = req.params;
    console.log(`Received request for className: ${className}`);

    const classData = await Class.findOne({ className });
    if (!classData) {
      console.log('Class not found');
      return res.status(404).json({ message: 'Class not found' });
    }

    const classSubjectMap = await ClassSubjectMapping
      .find({ classId: classData._id })
      .populate('classId', 'className')
      .populate('subjectId', 'subjectName _id');

    console.log('Class Subject Map by ClassId:', classSubjectMap);

    if (!classSubjectMap || classSubjectMap.length === 0) {
      console.log('No mappings found for the specified class');
      return res.json([]);
    }

    const filteredData = filterClassSubjects(classSubjectMap);
    res.json(filteredData);
  } catch (error) {
    console.error('Error in getClassSubjectMappingByClassId:', error.message);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  mapSubjectToClass,
  getClassSubjectMapping,
  getClassSubjectMappingByClassId,
};
