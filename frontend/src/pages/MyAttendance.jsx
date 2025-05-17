import { useEffect, useState } from 'react';
import axios from 'axios';

function MyAttendance() {
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/attendance/mine', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRecords(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Attendance</h2>
      <table className="w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td className="border p-2">{new Date(r.date).toLocaleDateString()}</td>
              <td className="border p-2">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyAttendance;
