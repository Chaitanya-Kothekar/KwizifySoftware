import React, { useState } from 'react';
import DropdownClass from '.';
import SubjectDropdown from './SubjectDropdown';

const EditExamForm = ({ exam, onSave, onCancel }) => {
  const [title, setTitle] = useState(exam.title);
  const [academicYear, setAcademicYear] = useState(exam.academicYear);
  const [examTerm, setExamTerm] = useState(exam.examTerm);
  const [classData, setClassData] = useState(exam.className);
  const [subjectData, setSubjectData] = useState(exam.subject);

  const handleSave = () => {
    const updatedExam = {
      ...exam,
      title,
      academicYear,
      examTerm,
      className: classData,
      subject: subjectData
    };
    onSave(updatedExam);
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={academicYear}
        onChange={(e) => setAcademicYear(e.target.value)}
        placeholder="Academic Year"
      />
      <input
        type="text"
        value={examTerm}
        onChange={(e) => setExamTerm(e.target.value)}
        placeholder="Exam Term"
      />
      <div>
        <p>Class:</p>
        <DropdownClass setClass={setClassData} />
      </div>
      <div>
        <p>Subject:</p>
        <SubjectDropdown setSubjectData={setSubjectData} classData={classData} />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EditExamForm;
