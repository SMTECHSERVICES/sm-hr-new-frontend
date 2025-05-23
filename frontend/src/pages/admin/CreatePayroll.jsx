// pages/admin/CreatePayroll.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePayroll() {
  const { id } = useParams(); // Employee ID
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [formData, setFormData] = useState({
    month: '',
    basicSalary: '',
    hra: '',
    bonus: '',
    deductions: '',
  });

  const [isDisable,setIsDisable] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      const token = localStorage.getItem('token');
      
      const { data } = await axios.get(`http://localhost:5000/api/admin/employees/${id}`, {
        headers: { Authorization: token },
      });
      setEmployee(data.employee);
    };
    fetchEmployee();
  }, [id]);

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: name === 'month' ? value : Number(value),
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setIsDisable(true);
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/admin/payroll/generate/${id}`,
        formData,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(data)
      alert('Payroll generated successfully!');
      navigate(`/admin/employee/${id}`);
    } catch (error) {
      console.error(error);
      alert('Error generating payroll');
    }
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Generate Payroll for {employee.name}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Month</label>
            <input
  type="month"
  name="month"
  required
  className="w-full p-2 border rounded"
  onChange={handleChange}
/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Basic Salary</label>
            <input type="number" name="basicSalary" required className="w-full p-2 border rounded"
              onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1 font-medium">HRA</label>
            <input type="number" name="hra" required className="w-full p-2 border rounded"
              onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Bonus</label>
            <input type="number" name="bonus" required className="w-full p-2 border rounded"
              onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Deductions</label>
            <input type="number" name="deductions" required className="w-full p-2 border rounded"
              onChange={handleChange} />
          </div>
          <div className="col-span-2 text-right">
            <button
            disabled={isDisable}
              type="submit"
              className={!isDisable ? `bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded mt-4` :`bg-gray-300 cursor-none`}
            >
              Generate Payroll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePayroll;
