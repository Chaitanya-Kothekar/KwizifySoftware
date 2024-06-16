import React, { useState, useRef, useEffect } from 'react';
import upBtn from '../assets/images/arrow.png';
import { toast } from 'react-toastify';
import axios from 'axios';

const SubjectDropdown = ({ setSubjectData, classData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);
  const [subData, setSubData] = useState([]);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSubjectData(option.subjectName);
    setSelectedOption(option.subjectName);
    setIsOpen(false);
  };

  const fetchGetData = async () => {
    try {
      console.log(`againdata ${classData}`);
      const response = await axios.get(`http://localhost:5000/api/mapping/getMap/` + classData);
      setSubData(response.data);
      setFetchFailed(false);
    } catch (error) {
      if (!isInitialLoad) {
        setFetchFailed(true);
      }
    } finally {
      setIsInitialLoad(false);
    }
  };

  useEffect(() => {
    if (fetchFailed) {
      toast.error('Failed to load subject data');
    }
  }, [fetchFailed]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    fetchGetData();
  }, [classData]);

  return (
    <div className="relative inline-block shadow text-center rounded-md" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="border border-x-gray-300 rounded-md px-4 py-2 focus:outline-none w-[350px] relative shadow-lg"
      >
        {selectedOption ? selectedOption : 'Subjects'}
        <img
          className={`h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 ${isOpen ? 'rotate-180' : ''}`}
          src={upBtn}
          alt="up Button"
        />
      </button>
      {isOpen && (
        <div
          className="z-10 h-[15vh] overflow-y-auto origin-top-left absolute left-0 mt-2 w-[350px] rounded-md shadow-lg shadow-slate-500 bg-white ring-1 ring-black ring-opacity-5"
          role="listbox"
          id="options-menu"
        >
          {subData.subjects?.length > 0 ? (
            subData.subjects.map((subdata, index) => (
              <button
                onClick={() => handleOptionClick(subdata)}
                key={index}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
                aria-selected={subdata}
                role="option"
              >
                {subdata.subjectName}
              </button>
            ))
          ) : (
            <div className="block px-4 py-2 text-sm text-gray-700">No Subjects available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubjectDropdown;
