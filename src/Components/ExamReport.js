import React, { useEffect, useState } from 'react';
import ExamReportClassBox from './ExamReportClassBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const colorCodes = ['bg-[#FF3821]', 'bg-[#FE8125]', 'bg-[#FFB713]', 'bg-[#E051CF]', 'bg-[#A137DF]'];

const ExamReport = () => {
  const [classNameData, setClassNameData] = useState('');
  const [classId, setClassId] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [marksData, setMarksData] = useState([]);

  const fetchData = async () => {
    try {
      const studentResponse = await axios.get(`http://localhost:5000/api/students/students/classname/${classNameData}`);
      const subjectResponse = await axios.get(`http://localhost:5000/api/mapping/getMap/${classNameData}`);
      const marksResponse = await axios.get(`http://localhost:5000/api/scores/class/${classId}`);
  
      // Check if there are no students
      if (studentResponse.data.length === 0) {
        setStudentData([]);
        toast.error('No students found for this class. Please create students for the class.');
        return;
      }
  
      // Check if marks data is empty
      if (marksResponse.data === null || marksResponse.data.length === 0) {
        setMarksData([]);
        toast.error('Please enter marks for the students in this class.');
      } else {
        setMarksData(marksResponse.data);
      }
  
      // Check if there are no subjects
      if (subjectResponse.data.subjects.length === 0) {
        setSubjectData([]);
        toast.error('No subjects mapped to this class. Please map subjects to the class.');
      } else {
        setSubjectData(subjectResponse.data.subjects);
      }
  
      setStudentData(studentResponse.data);
  
      console.log('Student Data:', studentResponse.data);
      console.log('Subject Data:', subjectResponse.data.subjects);
      console.log('Marks Data:', marksResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data. Please try again.');
    }
  };
  

  useEffect(() => {
    if (classNameData && classId) {
      fetchData();
    }
  }, [classNameData, classId]);

  const getMark = (studentId, subjectId) => {
    const markEntry = marksData.find((entry) => 
      entry.StudentId?._id === studentId && 
      entry.SubjectId?._id === subjectId
    );
    return markEntry ? markEntry.marks : 0;
  };
  

  const getTotalMarks = (studentId) => {
    return subjectData.reduce((total, subject) => {
      const mark = getMark(studentId, subject.subjectId);
      return total + mark;
    }, 0);
  };

  const sortedStudents = Array.isArray(studentData)
    ? studentData
        .map((student) => ({
          ...student,
          totalMarks: getTotalMarks(student._id)
        }))
        .sort((a, b) => b.totalMarks - a.totalMarks)
    : [];

  const getMedal = (index) => {
    switch (index) {
      case 0:
        return '🥇'; // Gold medal for the highest marks
      case 1:
        return '🥈'; // Silver medal for the second highest marks
      case 2:
        return '🥉'; // Bronze medal for the third highest marks
      default:
        return ''; // Empty string for others
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center bg-[#2f1367fd] w-full h-20 rounded-t-md">
        <ExamReportClassBox setClassNameData={setClassNameData} setClassId={setClassId} />
      </div>
      <div className="overflow-auto flex flex-col items-center bg-[#2f1367fd] h-[90vh]">
        {sortedStudents.length > 0 ? (
          sortedStudents.map((student, studentIndex) => (
            <div
              key={student._id}
              className={`${colorCodes[studentIndex % colorCodes.length]} h-[6vh] mb-5 rounded-full pr-10  w-[50vw] justify-center items-center text-lg justify-between pl-10 flex`}
            >
              <div className="p-3 text-white flex justify-center">{studentIndex < 3 ? getMedal(studentIndex) : studentIndex + 1}</div>
              <div className="p-3 text-white flex justify-center">{student.name || 'N/A'}</div>
              <div className="p-3 text-white flex justify-center">{student.totalMarks}</div>
            </div>
          ))
        ) : (
          <div className="text-white mt-5">No data available. Please select a class.</div>
        )}
      </div>
    </div>
  );
};

export default ExamReport;
