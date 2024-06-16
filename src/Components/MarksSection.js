import React, { useState, useRef, useEffect } from 'react';
import ExamReportClassBox from './ExamReportClassBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upBtn from '../assets/images/arrow.png';

const SubjectDropdown = ({ subjectData, selectedSubject, setSelectedSubject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (subjectId) => {
    setSelectedSubject(subjectId);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className=" relative inline-block text-center shadow rounded-md bg-white" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="border  border-gray-300 rounded-md px-4 py-2 focus:outline-none w-[350px] relative shadow-lg"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="options-menu"
      >
        {selectedSubject ? subjectData.find((subject) => subject.subjectId === selectedSubject)?.subjectName : 'Select Subject'}
        <img
          className={`h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 ${isOpen ? 'rotate-180' : ''}`}
          src={upBtn}
          alt="up Button"
        />
      </button>
      {isOpen && (
        <div
          className="z-10 h-[25vh] overflow-y-auto origin-top-left absolute left-0 mt-2 w-[250px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="listbox"
          id="options-menu"
        >
          {subjectData.length > 0 ? (
            subjectData.map((subject) => (
              <button
                onClick={() => handleOptionClick(subject.subjectId)}
                key={subject.subjectId}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
                aria-selected={subject.subjectId === selectedSubject}
                role="option"
              >
                {subject.subjectName}
              </button>
            ))
          ) : (
            <div className="block px-4 py-2 text-sm text-gray-700">No subjects available</div>
          )}
        </div>
      )}
    </div>
  );
};

const MarksSection = () => {
  const [classNameData, setClassNameData] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [classId, setClassId] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');

  const fetchMarksData = async () => {
    try {
      const marksResponse = await axios.get(`http://localhost:5000/api/scores/class/${classId}`);
      if (marksResponse.data.length > 0) {
        setMarksData(marksResponse.data);
        console.log('marksData', marksData);
      } else {
        setMarksData({});
      }
    } catch (error) {
      console.error('Error fetching marks data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const studentResponse = await axios.get(`http://localhost:5000/api/students/students/classname/${classNameData}`);
      const marksResponse = await axios.get(`http://localhost:5000/api/scores/class/${classId}`);
      console.log(studentResponse);
      if (studentResponse.data.length === 0) {
        toast.warn('No students found for this class. Please map students to the class first.');
        setStudentData([]);
      } else {
        const sortedStudents = studentResponse.data.sort((a, b) => a._id.localeCompare(b._id));
        setStudentData(sortedStudents);
      }
      const marksMap = {};
      marksResponse.data.forEach((mark) => {
        marksMap[mark.StudentId._id] = marksMap[mark.StudentId._id] || {};
        marksMap[mark.StudentId._id][mark.SubjectId._id] = mark.marks;
      });
      setMarksData(marksMap);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const subjectDataFetch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/mapping/getMap/${classNameData}`);
      setSubjectData(response.data.subjects);
    } catch (error) {
      console.error('Error fetching subject data:', error);
    }
  };

  useEffect(() => {
    if (classNameData) {
      subjectDataFetch();
    }
  }, [classNameData]);

  const handleInputChange = (studentId, subjectId, value) => {
    setMarksData((prevMarksData) => ({
      ...prevMarksData,
      [studentId]: {
        ...prevMarksData[studentId],
        [subjectId]: Number(value) // Ensure the value is a number
      }
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;
  
    setIsSubmitting(true);
  
    const dataToSend = [];
  
    studentData.forEach((student) => {
      subjectData.forEach((subject) => {
        const marks = marksData[student._id]?.[subject.subjectId];
        if (marks !== undefined) {
          dataToSend.push({
            ClassId: classId,
            StudentId: student._id,
            SubjectId: subject.subjectId,
            marks: marks
          });
        }
      });
    });
  
    console.log('Data to send:', dataToSend);
  
    try {
      if (dataToSend.length > 0) {
        const response = await axios.post('http://localhost:5000/api/scores/add', dataToSend);
        console.log('Response to backend:', response.data);
        toast.success('Marks submitted successfully!');
      } else {
        toast.warn('No marks to submit');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
      toast.error('Error submitting marks. Please try again.');
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };
  

  useEffect(() => {
    if (classId) {
      fetchData();
      fetchMarksData();
    }
  }, [classId, classNameData]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center pl-[20%] pr-[20%] bg-[#2f1367fd] w-full h-20 rounded-t-md px-4">
        <ExamReportClassBox setClassNameData={setClassNameData} setClassId={setClassId} />
        <SubjectDropdown subjectData={subjectData} selectedSubject={selectedSubject} setSelectedSubject={setSelectedSubject} />
      </div>
      <div className="overflow-auto mt-4">
        <table className="min-w-full bg-white">
          <thead className="bg-slate-300">
            {subjectData.length > 0 && (
              <>
                <tr>
                  <th className="p-3 border border-slate-400">Sr. No</th>
                  <th className="p-3 border border-slate-400">Students</th>
                  {selectedSubject && (
                    <th className="p-3 border border-slate-400">
                      {subjectData.find((subject) => subject.subjectId === selectedSubject)?.subjectName}
                    </th>
                  )}
                </tr>
              </>
            )}
          </thead>
          <tbody>
            {selectedSubject &&
              studentData.map((student, studentIndex) => (
                <tr key={studentIndex} className={studentIndex % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                  <td className="p-3 border border-slate-400">{studentIndex + 1}</td>
                  <td className="p-3 border border-slate-400">{student.name || 'N/A'}</td>
                  <td className="p-3 border border-slate-400">
                    <input
                      type="number"
                      value={marksData[student._id]?.[selectedSubject] || ''}
                      onChange={(e) => handleInputChange(student._id, selectedSubject, e.target.value)}
                      className="w-full h-10 border rounded px-2 bg-white"
                      placeholder="Enter marks out of 100"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
      <button
            type="submit"
            className="relative font-extrabold px-5 mt-10 text-center w-[8vw] py-2 text-white group "
            onClick={handleSubmit}
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
            <span className="relative">Submit</span>
          </button>
      </div>
    </div>
  );
};

export default MarksSection;
