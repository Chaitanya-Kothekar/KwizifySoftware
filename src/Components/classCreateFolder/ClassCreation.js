import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ClassRoom from '../../images/ClassRoom.png';

const ClassCreation = ({ setUpdateCards, updateCards, editingClass, setEditingClass }) => {
  const [formData, setFormData] = useState({
    className: '',
    roomNumber: ''
  });

  useEffect(() => {
    if (editingClass) {
      setFormData({
        className: editingClass.className,
        roomNumber: editingClass.roomNumber
      });
    } else {
      setFormData({
        className: '',
        roomNumber: ''
      });
    }
  }, [editingClass]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitFunc = async (e) => {
    e.preventDefault();
    const payload = {
      className: formData.className,
      roomNumber: parseInt(formData.roomNumber)
    };

    try {
      if (editingClass) {
        await axios.put(`http://localhost:5000/api/classes/update/${editingClass._id}`, payload);
        toast.success('Class Updated Successfully');
        setEditingClass(null);
      } else {
        await axios.post('http://localhost:5000/api/classes/create', payload);
        toast.success('Class Successfully Created');
      }
      setUpdateCards(!updateCards);
      setFormData({
        className: '',
        roomNumber: ''
      });
    } catch (error) {
      console.error('Failed to submit the form:', error);
      toast.error('Failed to submit the form');
    }
  };

  const cancelEdit = () => {
    setEditingClass(null);
    setFormData({
      className: '',
      roomNumber: ''
    });
  };

  return (
    <form onSubmit={submitFunc} className="h-[100%] w-[25vw] rounded-xl shadow-2xl border shadow-black border-white bg-[#2f1367fd]">
      <div className="flex flex-col justify-center p-5">
        <h1 className="text-center font-bold text-white shadow-md text-[30px] m-5 mt-1 p-5">
          {editingClass ? 'Edit Class' : 'Create Class'}
        </h1>
        <input
          id="classInput"
          name="className"
          value={formData.className}
          onChange={handleChange}
          placeholder="Enter Class Name"
          className="bg-white mt-4 p-4 rounded text-center border-black"
        />
        <input
          id="roomNumber"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          placeholder="Enter Room Number"
          type="number"
          className="bg-white mt-4 p-4 rounded text-center border-black"
        />
        <button type="submit" className="relative font-extrabold px-5 mt-10 text-center py-2 text-white group">
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
          <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
          <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
          <span className="relative">{editingClass ? 'Update' : 'Create'}</span>
        </button>
        {editingClass && (
          <button onClick={cancelEdit} className="relative font-extrabold px-5 mt-2 text-center py-2 text-white group">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-red-500 group-hover:bg-red-700 group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-red-700 group-hover:bg-red-500 group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-red-600 -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-red-400 -rotate-12"></span>
            <span className="relative">Cancel</span>
          </button>
        )}
        <div className="flex justify-center items-center">
          <img className="h-[28vh]" alt="Classroom" src={ClassRoom} />
        </div>
      </div>
    </form>
  );
};

export default ClassCreation;
