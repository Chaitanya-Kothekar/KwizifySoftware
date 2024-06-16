import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const [expandedExamId, setExpandedExamId] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/examCreation/exams');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
        toast.error('Failed to load exams');
      }
    };

    fetchExams();
  }, []);

  const handleToggleDetails = (examId) => {
    setExpandedExamId(expandedExamId === examId ? null : examId);
  };

  const handleDelete = async (examId) => {
    try {
      await axios.delete(`http://localhost:5000/api/examCreation/exams/${examId}`);
      setExams(exams.filter((exam) => exam._id !== examId));
      toast.success('Exam deleted successfully');
    } catch (error) {
      console.error('Error deleting exam:', error);
      toast.error('Failed to delete exam');
    }
  };

  const handleKeyPress = (event, examId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleToggleDetails(examId);
    }
  };

  return (
    <div className="p-5">
      {exams.length > 0 ? (
        <div className="space-y-4">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => handleToggleDetails(exam._id)}
              onKeyPress={(e) => handleKeyPress(e, exam._id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-1">
                  <div className="w-1/4">
                    <h2 className="text-lg font-semibold">{exam.title}</h2>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-600">Date: {new Date(exam.date).toLocaleDateString()}</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-600">Class: {exam.className}</p>
                  </div>
                  <div className="w-1/4">
                    <p className="text-gray-600">Subject: {exam.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <button
                    className="text-red-500 underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(exam._id);
                    }}
                  >
                    Delete
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(exam._id);
                    }}
                    className="relative font-extrabold px-5  text-center py-2 text-white group"
                  >
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-red-500 group-hover:bg-red-700 group-hover:skew-x-12"></span>
                    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-red-700 group-hover:bg-red-500 group-hover:-skew-x-12"></span>
                    <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-red-600 -rotate-12"></span>
                    <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-red-400 -rotate-12"></span>
                    <span className="relative">Delete</span>
                  </button>
                </div>
              </div>
              {expandedExamId === exam._id && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <p>
                    <strong>Academic Year:</strong> {exam.academicYear}
                  </p>
                  <p>
                    <strong>Exam Term:</strong> {exam.examTerm}
                  </p>
                  <p>
                    <strong>Start Time:</strong> {exam.startTime}
                  </p>
                  <p>
                    <strong>End Time:</strong> {exam.endTime}
                  </p>
                  <p>
                    <strong>Duration:</strong> {exam.duration} minutes
                  </p>
                  <p>
                    <strong>Number of Questions:</strong> {exam.numberOfQuestions}
                  </p>
                  <p>
                    <strong>Total Marks:</strong> {exam.totalMarks}
                  </p>
                  <p>
                    <strong>Description:</strong> {exam.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No exams found.</p>
      )}
    </div>
  );
};

export default ExamList;
