import React, { useState } from 'react';

const TimeRangePicker = ({setStartTimeData,setEndTimeData}) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setStartTimeData(e.target.value)
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
    setEndTimeData(e.target.value);
  };

  return (
    <div >
      <div className="mt-0   text-center">
        <h2>Select Start and End Time</h2>
      </div>
      <div className="bg-slate-100 rounded p-5 mt-2">
        <label className="mt-10">
          Start Time: &nbsp;
          <input
            className=" border-[2px] w-[12vw] pl-5 text-center rounded border-black bg-slate-100"
            type="time"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </label>
      </div>
      <div className="bg-slate-100 rounded pl-5  p-5 mt-2">
        <label>
          End Time: &nbsp; &nbsp;
          <input
            className="border-[2px] w-[12vw] text-center rounded border-black bg-slate-100"
            type="time"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </label>
      </div>
    </div>
  );
};

export default TimeRangePicker;
