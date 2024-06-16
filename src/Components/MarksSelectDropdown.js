import React, { useState, useRef, useEffect } from 'react';
import ExamReportClassBox from './ExamReportClassBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import upBtn from '../assets/images/arrow.png';

const MarksSelectDropdown = ({ subjectData, selectedSubject, setSelectedSubject }) => {
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
    <div className="w-[20vw] relative inline-block text-center shadow rounded-md bg-white" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none w-[250px] relative shadow-lg"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="options-menu"
      >
        {selectedSubject ? subjectData.find(subject => subject.subjectId === selectedSubject)?.subjectName : 'Select Subject'}
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
export default MarksSelectDropdown;