import React, { useState, useRef, useEffect } from 'react';
import upBtn from '../assets/images/arrow.png';

const DropdownBox = ({ setAcademicData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setAcademicData(option);
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
    <div className="relative inline-block shadow text-center rounded-md" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="border border-x-gray-300  rounded-md px-4 py-2  focus:outline-none w-[350px] relative shadow-lg"
        // aria-haspopup="listbox"
        // aria-expanded={isOpen}
        // aria-labelledby="options-menu"
      >
        {selectedOption ? selectedOption : 'Academic Year'}
        <img
          className={`h-6 w-6 absolute right-4 top-1/2 transform -translate-y-1/2 ${isOpen ? 'rotate-180' : ''}`}
          src={upBtn}
          alt="up Button"
        />
      </button>
      {isOpen && (
        <div
          className=" z-10 origin-top-left absolute left-0 mt-2 w-[350px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="listbox"
          id="options-menu"
        >
          <button
            onClick={() => handleOptionClick('2023-24')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
            // aria-selected={selectedOption === '2023-24'}
            // role="option"
          >
            2023-24
          </button>
          <button
            onClick={() => handleOptionClick('2024-25')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
            aria-selected={selectedOption === '2024-25'}
            role="option"
          >
            2024-25
          </button>
          <button
            onClick={() => handleOptionClick('2025-26')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
            aria-selected={selectedOption === '2025-26'}
            role="option"
          >
            2025-26
          </button>
          <button
            onClick={() => handleOptionClick('2026-27')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
            aria-selected={selectedOption === '2026-27'}
            role="option"
          >
            2026-27
          </button>
          <button
            onClick={() => handleOptionClick('2027-28')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer focus:outline-none w-full"
            aria-selected={selectedOption === '2027-28'}
            role="option"
          >
            2027-28
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownBox;
