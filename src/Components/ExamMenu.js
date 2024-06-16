import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ListAltIcon from '@mui/icons-material/ListAlt';

const ExamMenu = () => {
  return (
    <div className=" w-full border-[1px] border-white flex justify-center mb-6 mt-[1vh] p-4 shadow-2xl shaow-black bg-[#2f1367fd] rounded-lg ">
      {/* bg-[#2f1367fd] */}

      <Link
        to="/createBtn"
        className="mr-5  text-white h-8 pt-[5px] mt-0 text-center hover:bg-[#EDE7F6] hover:text-purple-900 cursor-pointer text-black w-[12vw] p-2 font-bold rounded"
      >
        <AddCircleOutlineOutlinedIcon />
        &nbsp; Create
      </Link>
      <Link
        to="/listBtn"
        className="mr-5 text-white  h-8 pt-[5px] mt-0 text-center hover:bg-[#EDE7F6] hover:text-purple-900 cursor-pointer text-black w-[12vw] p-2 font-bold rounded"
      >
        <ListAltIcon />
        &nbsp; List
      </Link>
    </div>
  );
};

export default ExamMenu;
