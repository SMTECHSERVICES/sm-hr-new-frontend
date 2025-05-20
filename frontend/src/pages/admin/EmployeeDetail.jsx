import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetail = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`http://localhost:5000/api/admin/employees/${id}`, {
          headers: { Authorization: token },
        });

        setEmployee(data?.employee || {});
        setAttendance(data?.attendanceRecord[0]?.attendanceReport || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUserDetail();
  }, [id]);

  const totalDays = attendance.length;
  const presentDays = attendance.filter(a => a.status === 'Present').length;
  const absentDays = attendance.filter(a => a.status === 'Absent').length;
  const leaveDays = attendance.filter(a => a.status === 'Leave').length;

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="ml-64 min-h-screen p-6 bg-gray-100 space-y-6">
      {/* Employee Details with Avatar */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6">Employee Details</h2>
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded overflow-hidden border shadow">
            <img
              src={employee.avatar || '/default-avatar.png'}
              alt="Employee Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Details */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Role:</strong> {employee.role}</p>
            <p><strong>Salary:</strong> ₹{employee.salary}</p>
          </div>
        </div>
      </div>

      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow text-center">
          <h4 className="text-lg font-medium">Total Days</h4>
          <p className="text-2xl font-bold text-blue-600">{totalDays}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h4 className="text-lg font-medium">Present</h4>
          <p className="text-2xl font-bold text-green-600">{presentDays}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h4 className="text-lg font-medium">Absent</h4>
          <p className="text-2xl font-bold text-red-600">{absentDays}</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h4 className="text-lg font-medium">Leave</h4>
          <p className="text-2xl font-bold text-yellow-600">{leaveDays}</p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Attendance Report</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((entry, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{new Date(entry.date).toLocaleDateString()}</td>
                <td className="p-2">{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDetail;
