import React, { useState, useRef, useEffect } from 'react';
import upBtn from '../assets/images/arrow.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const ExamReportClassBox = ({ setClassNameData, setClassId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);
  const [classData, setClassData] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option, id) => {
    console.log('id', id);
    setClassId(id);
    setClassNameData(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  const fetchGetData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes/get');

      setClassData(response.data);
    } catch (error) {
      toast.error('Failed to load  class data');
      console.error('Error fetching class data:', error);
    }
  };

  useEffect(() => {
    fetchGetData();

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
    <div className="relative inline-block text-center shadow rounded-md bg-white" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none w-[350px] relative shadow-lg"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="options-menu"
      >
        {selectedOption ? selectedOption : 'Classes'}
        <img
          className={`h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 ${isOpen ? 'rotate-180' : ''}`}
          src={upBtn}
          alt="up Button"
        />
      </button>
      {isOpen && (
        <div
          className="z-10 h-[25vh] overflow-y-auto origin-top-left absolute left-0 mt-2 w-[350px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="listbox"
          id="options-menu"
        >
          {classData.length > 0 ? (
            classData.map((classdata) => (
              <button
                onClick={() => handleOptionClick(classdata?.className, classdata?._id)}
                key={classdata?._id}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
                aria-selected={classdata?.className}
                role="option"
              >
                {classdata?.className}
              </button>
            ))
          ) : (
            <div className="block px-4 py-2 text-sm text-gray-700">No classes available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamReportClassBox;
