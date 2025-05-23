import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState(['not allowed']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `${token}` };

        const empRes = await axios.get('http://localhost:5000/api/employee/me', { headers });
        const attendanceRes = await axios.get('http://localhost:5000/api/employee/attendance/me', { headers });

        setEmployee(empRes?.data);
        setAttendance(attendanceRes?.data.attendanceReport);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Employee Dashboard</h2>

      {/* Profile Section */}
      <div className="bg-white p-4 sm:p-6 rounded shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6">
  {/* Profile Details (left on sm+, below image on xs) */}
  <div className="flex-1 min-w-[250px] text-center sm:text-left order-2 sm:order-1">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">Employee Profile</h2>
    <p><strong>Name:</strong> {employee.name}</p>
    <p><strong>Email:</strong> {employee.email}</p>
    <p><strong>Department:</strong> {employee.department}</p>
    <p><strong>Role:</strong> {employee.role}</p>
    <p><strong>Salary:</strong> ₹{employee.salary}</p>
  </div>

  {/* Profile Image (top on xs, right on sm+) */}
  {employee.avatar && (
    <div className="w-24 h-24 sm:w-40 sm:h-40 border shadow-sm overflow-hidden  order-1 sm:order-2">
      <img
        src={employee.avatar}
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
  )}
</div>


      {/* Attendance Section */}
      <div className="bg-white p-4 sm:p-6 rounded shadow-md overflow-x-auto">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Daily Attendance</h2>
        <table className="w-full text-sm min-w-[300px]">
          <thead>
            <tr className="text-left border-b">
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((entry, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{new Date(entry.date).toLocaleDateString()}</td>
                <td className="p-2 capitalize">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Salary Slip */}
      <div className="bg-white p-4 sm:p-6 rounded shadow-md text-center">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Salary Slip</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
          Download Latest Salary Slip (PDF)
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
