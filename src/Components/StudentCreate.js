import React, { useEffect, useState } from 'react';
import StudentCreation from './studentCreateFolder/StudentCreation';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const StudentCreate = () => {
  const colorCodes = ['bg-[#F7F6F2]', 'bg-[#F3EEEA]', 'bg-[#F7F6F2]'];

  const [studentData, setStudentData] = useState([]);
  const [updateCards, setUpdateCards] = useState(false);
  const [toggleBox, setToggleBox] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deleteStudentId, setDeleteStudentId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/students/get");
        setStudentData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [updateCards]);

  const menuOptionOpen = (index) => {
    setToggleBox(toggleBox === index ? null : index);
  };

  const deleteFunc = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setUpdateCards((prev) => !prev);
      setDeleteStudentId(null); // Reset the delete student ID after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editFunc = (student) => {
    setEditingStudent(student);
  };

  const confirmDelete = (id) => {
    setDeleteStudentId(id);
  };

  return (
    <div className="flex">
      <div>
        <StudentCreation
          setUpdateCards={setUpdateCards}
          updateCards={updateCards}
          editingStudent={editingStudent}
          setEditingStudent={setEditingStudent}
        />
      </div>
      <div className="scrollbarhide w-[70%] h-[81.8vh] ml-20 rounded-xl overflow-scroll p-5 flex flex-wrap">
        {studentData.map((student, index) => (
          <div
            key={student?._id}
            className={`${colorCodes[index % colorCodes.length]} relative overflow-hidden border-[1px] flex flex-col gap-1 justify-center items-center shadow-md shadow-black h-[13vh] md:h-[12vh] text-black font-bold m-5 w-[10vw] rounded-xl`}
          >
            <div className="absolute top-1 right-1 z-10">
              <MoreHorizIcon
                className="cursor-pointer mr-2"
                onClick={() => menuOptionOpen(index)}
              />
              {toggleBox === index && (
                <div className="bg-[#E3DCDF] shadow-white p-[1px] mt-[-3px] mr-[5px] flex justify-center items-center flex-col rounded-lg cursor-pointer">
                  <EditIcon
                    className="p-1 hover:bg-slate-50 rounded-md cursor-pointer"
                    onClick={() => editFunc(student)}
                  />
                  <DeleteIcon
                    onClick={() => confirmDelete(student?._id)}
                    className="mt-1 p-1 hover:bg-slate-50 rounded-md cursor-pointer"
                  />
                </div>
              )}
            </div>
            <div className="p-5 w-full flex flex-col items-center justify-center">
              <h2>{student?.name}</h2>
              <h3>{student?.className}</h3>
            </div>
          </div>
        ))}
      </div>
      {deleteStudentId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this student?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setDeleteStudentId(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button onClick={() => deleteFunc(deleteStudentId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCreate;
