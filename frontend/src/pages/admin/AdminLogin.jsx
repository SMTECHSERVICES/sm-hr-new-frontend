import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
  const [adminSecret, setAdminSecret] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Admin Secret:', adminSecret);
    // Add your validation or API call here
   try {
     const {data} =await axios.post('http://localhost:5000/api/admin/auth/login',{adminSecret});
    // console.log(data);
    // console.log(data.token)
       localStorage.setItem('token', data.token);
      navigate('/admin/dashboard');
   } catch (error) {
    alert('an unexpected error occured')
    console.log(error)
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Admin Secret
        </label>
        <input
          type="password"
          placeholder="Enter admin secret"
          value={adminSecret}
          onChange={(e) => setAdminSecret(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
