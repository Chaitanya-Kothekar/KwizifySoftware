import React, { useEffect, useState, useRef } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import axios from 'axios';
import { toast } from 'react-toastify';

const ClassSubMap = () => {
  const [clasOpen, setClassOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [classData, setClassData] = useState([]);
  const [subData, setSubData] = useState([]);
  const [subSelectedValue, setSubSelectedValue] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [mappingData, setMappingData] = useState([]);
  const [classId, setClassId] = useState(null);

  const classDropdownRef = useRef(null);
  const subjectDropdownRef = useRef(null);

  useEffect(() => {
    fetchData();
    fetchData2();
    mapDataFetch();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/classes/get');
      setClassData(response.data);
    } catch (err) {
      console.error('Error fetching class data:', err);
      toast.error('Failed to fetch class data');
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subjects/get');
      setSubData(response.data);
    } catch (err) {
      console.error('Error fetching subject data:', err);
      toast.error('Failed to fetch subject data');
    }
  };

  const mapDataFetch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mapping/getMap');
      setMappingData(response.data);
    } catch (err) {
      console.error('Error fetching mapping data:', err);
      toast.error('Failed to fetch mapping data');
    }
  };

  const toggleClassfunc = () => {
    setClassOpen((openButton) => !openButton);
  };

  const toggleSubfunc = () => {
    setSubOpen((openButton2) => !openButton2);
  };

  const handleClick = (dataName) => {
    setSelectedValue(dataName);
    setClassOpen(false);
    const classInfo = classData.find((item) => item.className === dataName);
    if (classInfo) {
      setClassId(classInfo._id);
    }
  };

  const handleClick2 = (dataName) => {
    const isSelected = subSelectedValue.includes(dataName);
    if (isSelected) {
      setSubSelectedValue(subSelectedValue.filter((value) => value !== dataName));
    } else {
      setSubSelectedValue([...subSelectedValue, dataName]);
    }
  };

  const handleMapping = async () => {
    if (!selectedValue || subSelectedValue.length === 0) {
      toast.warn('Please select a class and at least one subject');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/mapping/map', {
        classId: classId,
        className: selectedValue,
        subjectNames: subSelectedValue
      });
      mapDataFetch(); // Refresh the mapping data
      toast.success('Mapping successful');
    } catch (err) {
      console.error('Error mapping subjects to class:', err);
      toast.error('Error mapping subjects to class');
    }
  };

  const handleClickOutside = (event) => {
    if (classDropdownRef.current && !classDropdownRef.current.contains(event.target)) {
      setClassOpen(false);
    }
    if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target)) {
      setSubOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="h-[12vh] p-5 text-white rounded w-full bg-[#2f1367fd] flex items-center justify-center">
        <div className="relative" ref={classDropdownRef}>
          <input
            className="text-black p-2 rounded w-[20vw] ml-[5vw] text-center border-black bg-white"
            value={selectedValue || 'Select Class'}
            onClick={toggleClassfunc}
            readOnly
          />
          {clasOpen && (
            <div className="bg-white h-[25vh] overflow-y-auto text-black m-2 p-2 pt-1 absolute flex items-center flex-col border ml-[5vw] w-[20vw]">
              {classData.map((data) => (
                <button
                  onClick={() => handleClick(data.className)}
                  className="flex p-1 justify-center rounded-md mt-2 w-full bg-slate-100 hover:bg-slate-200"
                  key={data._id}
                >
                  {data.className}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ml-10">
          <AddOutlinedIcon />
        </div>

        <div className="relative" ref={subjectDropdownRef}>
          <input
            className="text-black p-2 rounded w-[20vw] ml-[3vw] text-center border-black bg-white"
            value={subSelectedValue.length > 0 ? subSelectedValue.join(', ') : 'Select Subject(s)'}
            onClick={toggleSubfunc}
            readOnly
          />
          {subOpen && (
            <div className="bg-white h-[25vh] overflow-y-auto text-black m-2 p-2 pt-1 absolute flex flex-col border ml-[3vw] w-[20vw]">
              {subData.map((data) => (
                <label className="flex items-center mt-1 p-1 h-10 rounded bg-slate-100" key={data._id}>
                  <input
                    type="checkbox"
                    checked={subSelectedValue.includes(data.subjectName)}
                    onChange={() => handleClick2(data.subjectName)}
                    className="mr-[30%]"
                  />
                  {data.subjectName}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="ml-[8%]">
          <button
            onClick={handleMapping}
            className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-black bg-white transition duration-300 ease-out rounded-full shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
            <span className="absolute font-bold flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full  ease">
              Map
            </span>
            <span className="relative invisible">Button Text</span>
          </button>
        </div>
      </div>

      <div className="h-[80vh] shadow-2xl p-5 overflow-auto">
        <table className="min-w-full bg-white ">
          <thead className="bg-slate-300">
            <tr>
              <th className="p-3 border border-slate-400">S.No</th>
              <th className="p-3 border border-slate-400">Class</th>
              <th className="p-3 border border-slate-400">Subjects</th>
            </tr>
          </thead>
          <tbody>
            {mappingData &&
              mappingData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                  <td className="p-3 w-[10vw] border border-slate-400">{index + 1}</td>
                  <td className="p-3 w-[10vw] border border-slate-400">{row.class ? row.class.className : 'N/A'}</td>
                  <td className="p-3 w-[80vw] border border-slate-400">
                    {row.subjectsArr
                      ? row.subjectsArr.map((sub) => (
                          <span key={sub?._id} className="mr-2">
                            {sub ? sub.subjectName : 'N/A'}
                          </span>
                        ))
                      : 'N/A'}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClassSubMap;
