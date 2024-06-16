import React, { useEffect, useState } from 'react';
import SubCreation from './subCreateFolder/subCreaction';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const colorCodes = ['bg-[#F7F6F2]', 'bg-[#F3EEEA]', 'bg-[#F7F6F2]'];

const SubjectCreation = () => {
  const [subData, setSubData] = useState([]);
  const [updateCards, setUpdateCards] = useState(false);
  const [toogleBox, setToogleBox] = useState(null);
  const [editingSubject, setEditingSubject] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteSubjectId, setDeleteSubjectId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/subjects/get');
      setSubData(response.data);
    } catch (error) {
      toast.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updateCards]);

  const toogleBoxOpenFunc = (index) => {
    setToogleBox(toogleBox === index ? null : index);
  };

  const confirmDelete = (id) => {
    setDeleteSubjectId(id);
    setShowConfirmation(true);
  };

  const deleteFunc = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${deleteSubjectId}`);
      toast.success('Subject Deleted successfully');
      setUpdateCards(!updateCards);
    } catch (error) {
      console.error('Failed to delete the subject', error);
    } finally {
      setShowConfirmation(false);
      setDeleteSubjectId(null);
    }
  };

  const startEdit = (element) => {
    setEditingSubject(element);
  };

  return (
    <div className="flex relative">
      <div className="shadow-2xl h-[82vh] border shadow-black rounded-xl">
        <SubCreation 
          editingSubject={editingSubject}
          setEditingSubject={setEditingSubject}
          updateCards={updateCards}
          setUpdateCards={setUpdateCards}
        />
      </div>
      <div className="scrollbarhide w-[70%] h-[81.8vh] ml-20 rounded-xl overflow-scroll p-5 flex flex-wrap">
        {subData.map((element, index) => (
          <div
            key={element?._id || index}
            className={`${colorCodes[index % colorCodes.length]} relative overflow-hidden border-[1px] flex flex-col gap-1 justify-center items-center shadow-md shadow-black h-[13vh] md:h-[12vh] text-black font-bold m-5 w-[10vw] rounded-xl`}
          >
            <div className="absolute top-1 right-1 cursor-pointer z-10">
              <MoreHorizIcon className="z-20 cursor-pointer mr-2" onClick={() => toogleBoxOpenFunc(index)} />
              {toogleBox === index && (
                <div className="bg-[#E3DCDF] shadow-white p-[1px] mt-[-3px] mr-[5px] flex justify-center items-center flex-col rounded-lg cursor-pointer z-30">
                  <EditIcon className="p-1 hover:bg-slate-50 rounded-md cursor-pointer" onClick={() => startEdit(element)} />
                  <DeleteIcon onClick={() => confirmDelete(element?._id)} className="mt-1 p-1 hover:bg-slate-50 rounded-md cursor-pointer" />
                </div>
              )}
            </div>
            <div className='p-2 mt-2'>
              <h2 className="text-md ">{element.subjectName}</h2>
              <h4 className="text-xs ">{element.description}</h4>
            </div>
          </div>
        ))}
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this subject?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={deleteFunc}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectCreation;
