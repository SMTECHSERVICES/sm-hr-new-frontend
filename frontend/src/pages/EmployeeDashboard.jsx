import React from 'react';
import { useEffect, useState } from 'react';
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
        //const leaveRes = await axios.get('http://localhost:5000/api/leave/me', { headers });

        setEmployee(empRes?.data);
        setAttendance(attendanceRes?.data.attendanceReport);
        //setLeaves(leaveRes.data);
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
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Employee Profile</h2>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Role:</strong> {employee.role}</p>
        <p><strong>Salary:</strong> ₹{employee.salary}</p>
      </div>

      {/* Attendance Section */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Daily Attendance</h2>
        <table className="w-full text-sm">
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
                <td className="p-2">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Salary Slip */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Salary Slip</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Download Latest Salary Slip (PDF)
        </button>
      </div>

      {/* Leave Application */}
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
        <form className="space-y-4">
          <input type="date" className="w-full border p-2 rounded" required />
          <textarea
            placeholder="Reason"
            className="w-full border p-2 rounded"
            rows={3}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Apply Leave
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
