import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/shared/AuthLayout';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [btnDisable, setBtnDisable] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    salary: '',
    password: '',
    department: '',
    role: 'employee',
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.avatar) {
      alert('Please upload a profile picture.');
      return;
    }
    setBtnDisable(true);
    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        dataToSend.append(key, value);
      });

      const data = await axios.post('http://localhost:5000/api/auth/register', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      localStorage.setItem('token', data?.data.token);
      navigate('/empdashboard');
    } catch (error) {
      console.log(error);
      alert('Something went wrong. Please try again.');
      setBtnDisable(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md md:max-w-lg lg:max-w-xl w-full mx-auto mt-10 px-4 sm:px-6 md:px-8 py-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Register Employee
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Avatar */}
          <div>
            <label
              htmlFor="avatar"
              className="block w-full text-center cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-md transition"
            >
              Choose your profile picture
            </label>
            <input
              id="avatar"
              type="file"
              name="avatar"
              onChange={handleChange}
              className="hidden"
            />
            {formData.avatar && (
              <p className="text-green-600 text-sm mt-1 text-center">
                Selected: {formData.avatar.name}
              </p>
            )}
          </div>

          {/* Text Inputs */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Role Selection */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          {/* Submit Button */}
          <button
            disabled={btnDisable}
            type="submit"
            className={`w-full py-3 text-lg font-medium rounded-md transition ${
              btnDisable
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {btnDisable ? 'Sending...' : 'Register'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegisterForm;
