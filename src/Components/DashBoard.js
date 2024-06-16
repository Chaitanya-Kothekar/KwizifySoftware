import React, { useState } from 'react';
import Dropdown from 'Components/Dropdown';
import Dropdown2 from 'Components/Dropdown2';
import DropDown3 from 'Components/DropDown3';
import ExamCreateDetails from 'Components/ExamCreateDetails';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextField from '@mui/material/TextField';
import SubjectDropdown from './SubjectDropdown';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ErrorBoundary } from 'react-error-boundary';

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const DashBoard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [academicData, setAcademicData] = useState(null);
  const [termData, setTermData] = useState(null);
  const [classData, setClass] = useState(null);
  const [subjectData, setSubjectData] = useState(null);
  const [startTimeData, setStartTimeData] = useState(null);
  const [endTimeData, setEndTimeData] = useState(null);
  const [titleData, setTitledata] = useState(null);
  const [durationTime, setDurationTime] = useState(null);
  const [numofQue, setNumofQue] = useState(null);
  const [marks, setMarks] = useState(null);
  const [descriptionExam, setDeascriptionExam] = useState(null);

  const dataSend = async () => {
    const payload = {
      academicYear: academicData,
      examTerm: termData,
      startTime: startTimeData,
      endTime: endTimeData,
      title: titleData,
      duration: durationTime,
      numberOfQuestions: numofQue,
      totalMarks: marks,
      description: descriptionExam,
      date: selectedDate,
      className: classData,
      subject: subjectData
    };

    try {
      await axios.post('http://localhost:5000/api/examCreation/exams', payload);
      toast.success('Successfully sent data');
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('Data not submitted. Please try again.');
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="w-full h-[180px] justify-center items-center rounded-md p-5 shadow-2xl shadow-slate-700 bg-white">
        <div className="flex items-center">
          <div className="mr-[3%]">
            <Dropdown setAcademicData={setAcademicData} />
          </div>
          <div className="mr-[3%]">
            <Dropdown2 setTermData={setTermData} />
          </div>
          <div className="mr-[3%]">
            <DropDown3 setClass={setClass} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="mt-[3%]">
            <SubjectDropdown classData={classData} setSubjectData={setSubjectData} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-white w-[35%] mt-3 rounded-lg shadow-2xl shadow-black p-4">
          <div className="flex justify-center mt-[5%]">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="ml-[3%] mt-[5%]">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="flex flex-col ">
                <TimePicker
                  label="Start Time"
                  value={startTimeData}
                  onChange={(newValue) => setStartTimeData(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <TimePicker
                  className="mt-5"
                  label="End Time"
                  value={endTimeData}
                  onChange={(newValue) => setEndTimeData(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </LocalizationProvider>
          </div>
        </div>
        <div className="bg-white w-[65%] mt-3 ml-5 rounded-lg shadow-2xl shadow-black p-4">
          <ExamCreateDetails
            setTitledata={setTitledata}
            setDurationTime={setDurationTime}
            setNumofQue={setNumofQue}
            setMarks={setMarks}
            setDeascriptionExam={setDeascriptionExam}
          />
        </div>
      </div>
      <div className="mt-[-2vh] w-full flex justify-center">
        <button type="submit" className="relative font-extrabold px-5 mt-10 text-center w-[8vw] py-2 text-white group" onClick={dataSend}>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
          <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
          <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
          <span className="relative">Submit</span>
        </button>
      </div>
    </ErrorBoundary>
  );
};

export default DashBoard;
