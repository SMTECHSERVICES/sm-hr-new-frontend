import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

const GetALLEmployee = () => {
      const [employees, setEmployees] = useState([]);
      const [loading, setLoading] = useState(true);
      
        const token = localStorage.getItem('token');
          const headers = { Authorization: `${token}` };

          useEffect(() => {
              const fetchData = async () => {
                try {
                  const empRes = await axios.get('http://localhost:5000/api/admin/employees/all', { headers });
                
          
                  setEmployees(empRes.data);
               
                } catch (err) {
                  console.error('Error fetching admin dashboard data', err);
                } finally {
                  setLoading(false);
                }
              };
          
              fetchData();
            }, []);

            if(loading) return <div>Loading....</div>
          
  return (
    <div>
        <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Manage Employees</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Department</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-b">
                <td className="p-2">{emp.name}</td>
                <td className="p-2">{emp.department}</td>
                <td className="p-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => generatePayslip(emp._id)}
                  >
                    Payroll
                  </button>
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => markAttendance(emp._id, 'Present')}
                  >
                    Mark Present
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => grantLeave(emp._id)}
                  >
                    Grant Leave
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GetALLEmployee
