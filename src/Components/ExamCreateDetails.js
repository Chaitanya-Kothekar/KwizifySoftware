import React, { useState } from 'react';
import { TextField, TextareaAutosize } from '@mui/material';

const ExamCreateDetails = ({ setTitledata, setDurationTime, setNumofQue, setMarks, setDeascriptionExam }) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');

  const handleChange1 = (e) => {
    setInput1(e.target.value);
    setTitledata(e.target.value);
  };

  const handleChange2 = (e) => {
    setInput2(e.target.value);
    setDurationTime(e.target.value.replace(/[^\d]/g, ''));
  };

  const handleChange3 = (e) => {
    setInput3(e.target.value);
    setNumofQue(e.target.value.replace(/[^\d]/g, ''));
  };

  const handleChange4 = (e) => {
    setInput4(e.target.value);
    setMarks(e.target.value.replace(/[^\d]/g, ''));
  };

  const handleChange5 = (e) => {
    setInput5(e.target.value);
    setDeascriptionExam(e.target.value);
  };

  const handleClick = (setState, defaultValue) => {
    setState(defaultValue);
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="mt-1 m-4">
          <TextField
            label="Title"
            className={`w-[23vw]`}
            value={input1}
            onChange={handleChange1}
            onClick={() => handleClick(setInput1, '')}
          />
        </div>
        <div className="mt-1 m-4">
          <TextField
            label="Duration (In Minutes)"
            className={`w-[23vw]`}
            value={input2}
            onChange={handleChange2}
            onClick={() => handleClick(setInput2, '')}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-1 m-4">
          <TextField
            label="Number Of Questions"
            className={`w-[23vw]`}
            value={input3}
            onChange={handleChange3}
            onClick={() => handleClick(setInput3, '')}
          />
        </div>
        <div className="mt-1 m-4">
          <TextField
            label="Marks"
            className={`w-[23vw]`}
            value={input4}
            onChange={handleChange4}
            onClick={() => handleClick(setInput4, '')}
          />
        </div>
      </div>
      <div className="mt-1 m-4">
        <TextareaAutosize
          minRows={4}
          className='bg-[#F8FAFC] border border-1-black'
          placeholder="Description"
          style={{
            width: '100%',
            padding: '16.5px 14px',
            borderRadius: '4px',
            borderColor: 'rgba(0, 0, 0, 0.23)',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '1rem',
            lineHeight: '1.4375em',
            letterSpacing: '0.00938em',
          }}
          value={input5}
          onChange={handleChange5}
          onClick={() => handleClick(setInput5, '')}
        />
      </div>
    </>
  );
};

export default ExamCreateDetails;
