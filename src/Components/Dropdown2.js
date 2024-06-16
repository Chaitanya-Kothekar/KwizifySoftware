import React, { useState, useRef, useEffect } from 'react';
import upBtn from '../assets/images/arrow.png';

const DropdownExamTermBox = ({setTermData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setTermData(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

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

  return (
    <div className="relative inline-block text-center  rounded-md shadow  " ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none outline-color:[#DADADA] w-[350px] relative shadow-lg"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="options-menu"
      >
        {selectedOption ? selectedOption : 'Exam Term'}
        <img
          className={`h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 ${isOpen ? 'rotate-180' : ''}`}
          src={upBtn}
          alt="up Button"
        />
      </button>
      {isOpen && (
        <div
          className="z-10 origin-top-left absolute left-0 mt-2 w-[350px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="listbox"
          id="options-menu"
        >
          <button
            onClick={() => handleOptionClick('Term 1')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
            aria-selected={selectedOption === 'Term 1'}
            role="option"
          >
            Term 1
          </button>
          <button
            onClick={() => handleOptionClick('Term 2')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
            aria-selected={selectedOption === 'Term 2'}
            role="option"
          >
            Term 2
          </button>
          <button
            onClick={() => handleOptionClick('Term 3')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
            aria-selected={selectedOption === 'Term 3'}
            role="option"
          >
            Term 3
          </button>
          <button
            onClick={() => handleOptionClick('Term 4')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
            aria-selected={selectedOption === 'Term 4'}
            role="option"
          >
            Term 4
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownExamTermBox;
