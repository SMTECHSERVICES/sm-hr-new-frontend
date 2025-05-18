import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:5000/api/admin/employees/all', {
          headers: { Authorization: token },
        });
        console.log(data)
        setEmployees(data);
      } catch (error) {
        console.error('Failed to fetch employees', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/admin/employee/${id}`);
  };

  return (
    <div className="ml-64 min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">All Employees</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp._id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(emp._id)}
              >
                <td className="py-2 px-4 border">{emp.name}</td>
                <td className="py-2 px-4 border">{emp.email}</td>
                <td className="py-2 px-4 border">{emp.department}</td>
                <td className="py-2 px-4 border">{emp.role}</td>
                <td className="py-2 px-4 border">₹{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
