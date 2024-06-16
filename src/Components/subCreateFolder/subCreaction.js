import React, { useEffect, useState } from 'react';
import bookImg from '../../images/Books.png';
import { toast } from 'react-toastify';
import axios from 'axios';

const SubCreation = ({ setUpdateCards, updateCards, setEditingSubject, editingSubject }) => {
  const [formData, setFormData] = useState({
    subjectName: '',
    description: ''
  });

  useEffect(() => {
    if (editingSubject) {
      setFormData({
        subjectName: editingSubject.subjectName || '',
        description: editingSubject.description || ''
      });
    } else {
      setFormData({
        subjectName: '',
        description: ''
      });
    }
  }, [editingSubject]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitFunc = async (e) => {
    e.preventDefault();
    const payload = {
      subjectName: formData.subjectName,
      description: formData.description
    };

    try {
      let response;
      if (editingSubject) {
        response = await axios.put(`http://localhost:5000/api/subjects/${editingSubject._id}`, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toast.success('Subject Updated Successfully');
        setEditingSubject(null);
      } else {
        response = await axios.post('http://localhost:5000/api/subjects/create', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toast.success('Subject Successfully Created');
      }

      console.log(response);
      setUpdateCards(!updateCards);
    } catch (error) {
      if (error?.response?.status === 500) {
        toast.warn('Subject Already Created', error);
      } else {
        toast.error('Failed to create/update subject', error);
      }
    }
  };

  const cancelEdit = () => {
    setEditingSubject(null);
    setFormData({
      subjectName: '',
      description: ''
    });
  };

  return (
    <form onSubmit={submitFunc} className="h-[100%] w-[25vw] rounded-xl shadow-2xl border shadow-black border-white bg-[#2f1367fd]">
      <div className="flex flex-col justify-center p-5">
        <h1 className="text-center font-bold text-white shadow-md text-[30px] m-5 mt-1 p-5">
          {editingSubject ? 'Edit Subject' : 'Create Subject'}
        </h1>
        <input
          id="subjectName"
          name="subjectName"
          value={formData.subjectName}
          onChange={handleChange}
          placeholder="Enter Subject Name"
          className="bg-white mt-4 p-4 rounded text-center border-black"
        />
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Short Description"
          className="bg-white mt-4 p-4 rounded text-center border-black"
        />
        <button type="submit" className="relative font-extrabold px-5 mt-10 text-center py-2 text-white group">
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
          <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
          <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
          <span className="relative">{editingSubject ? 'Update' : 'Create'}</span>
        </button>
        {editingSubject && (
          <button onClick={cancelEdit} className="relative font-extrabold px-5 mt-2 text-center py-2 text-white group">
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-red-500 group-hover:bg-red-700 group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-red-700 group-hover:bg-red-500 group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-red-600 -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-red-400 -rotate-12"></span>
            <span className="relative">Cancel</span>
          </button>
        )}
        <div className="flex justify-center items-center">
          <img className="h-[28vh]" alt="subImg" src={bookImg} />
        </div>
      </div>
    </form>
  );
};

export default SubCreation;
