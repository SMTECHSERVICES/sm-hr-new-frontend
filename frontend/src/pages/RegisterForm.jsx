import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    salary: '',
    password: '',
    department: '',
    role: 'employee',
    avatar:null
  });

  const handleChange = (e) => {
    const { name, value,files } = e.target;
    setFormData(prev => ({ ...prev, [name]:files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Submitting:', formData);
    // Send to backend via fetch or axios here
    try {
    const dataToSend = new FormData();
Object.entries(formData).forEach(([key, value]) => {
  dataToSend.append(key, value);
});

const data = await axios.post('http://localhost:5000/api/auth/register', dataToSend, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
});
console.log(data)
     
    localStorage.setItem('token', data?.data.token);
    
    navigate('/empdashboard')
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Register Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType='multipart/form-data'>

        <input
         type='file'
          name="avatar"
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

