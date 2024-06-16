import React, { useEffect, useState } from 'react';
import student from '../../images/student.png';
import { toast } from 'react-toastify';
import axios from 'axios';

const StudentCreation = ({ setUpdateCards, updateCards, editingStudent, setEditingStudent }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [classData, setClassData] = useState([]);
  const [formData, setFormData] = useState({
    studentName: '',
    studentDescription: ''
  });

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        studentName: editingStudent.name,
        studentDescription: editingStudent.description || '' // Assuming description might be part of the student data
      });
      setSelectedClass(editingStudent.className);
    } else {
      setFormData({
        studentName: '',
        studentDescription: ''
      });
      setSelectedClass('');
    }
  }, [editingStudent]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/classes/get');
        setClassData(response.data);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    fetchClasses();
  }, []); // Removed classData from dependency array to avoid infinite loop

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const submitFunc = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.studentName,
      className: selectedClass
    };

    try {
      if (editingStudent) {
        await axios.put(`http://localhost:5000/api/students/${editingStudent._id}`, data);
        toast.success('Student Updated Successfully');
        setEditingStudent(null);
      } else {
        await axios.post('http://localhost:5000/api/students/create', data);
        toast.success('Student Successfully Created');
      }

      setUpdateCards(!updateCards);
    } catch (error) {
      toast.error('Failed to create/update student', error);
    }
  };

  const cancelEdit = () => {
    setEditingStudent(null);
    setFormData({
      studentName: '',
      studentDescription: ''
    });
    setSelectedClass('');
  };

  return (
    <form onSubmit={submitFunc} className="h-[100%] w-[25vw] rounded-xl shadow-2xl border shadow-black border-white bg-[#2f1367fd]">
      <div className="flex flex-col justify-center p-5">
        <h1 className="text-center font-bold text-white shadow-md text-[30px] m-5 mt-1 p-5">
          {editingStudent ? 'Edit Student' : 'Create Student'}
        </h1>
        <input
          id="studentName"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          placeholder="Enter Student Name"
          className="bg-white mt-4 p-4 rounded text-center border-black"
        />
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="bg-white mt-4 p-4 rounded text-center border-black"
        >
          <option value="">Select a Class</option>
          {classData.map((classItem) => (
            <option key={classItem._id} value={classItem.className}>
              {classItem.className}
            </option>
          ))}
        </select>
        <button type="submit" className="relative font-extrabold px-5 mt-10 text-center py-2 text-white group">
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
          <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
          <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
          <span className="relative">{editingStudent ? 'Update' : 'Create'}</span>
        </button>
        {editingStudent && (
          <button onClick={cancelEdit} className="relative font-extrabold px-5 mt-2 text-center py-2 text-white group">
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-red-500 group-hover:bg-red-700 group-hover:skew-x-12"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-red-700 group-hover:bg-red-500 group-hover:-skew-x-12"></span>
          <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-red-600 -rotate-12"></span>
          <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-red-400 -rotate-12"></span>
          <span className="relative">Cancel</span>
        </button>
        )}
        <div className="flex justify-center items-center">
          <img className="h-[28vh]" alt="stuImg" src={student} />
        </div>
      </div>
    </form>
  );
};

export default StudentCreation;
